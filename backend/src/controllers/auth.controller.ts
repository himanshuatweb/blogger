import { Request, Response } from "express";
import crypto from 'crypto';
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResonse";
import uploadOnCloudinary from "../utils/uploadCloudinary";
import sendEmail from "../utils/sendEmail";

const generateAccessAndRefereshTokens = async (userId: any) => {
    try {
        const user = await User.findById(userId)
        if (user) {
            //@ts-ignore
            const accessToken = user.generateAccessToken()
            //@ts-ignore
            const refreshToken = user.generateRefreshToken()

            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false })

            return { accessToken, refreshToken }
        }
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating token",
            ['Something went wrong while generating token']
        )
    }
}

// Auth Controllers
export const userRegister = asyncHandler(async function (req: Request, res: Response) {
    const { fullName, email, age, password } = req.body;
    let accessToken = ''

    //1.Check for empty fields
    if ([fullName, email, age, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required", ['All fields are required'])
    }

    // 2.Check if user already exists or not
    const userAlreadyExit = await User.findOne({ email });
    if (userAlreadyExit) {
        throw new ApiError(409, "User Already Exits", ['User Already Exits'])
    }

    // 3.Retrieve User Image Path
    //@ts-ignore
    const userImagePath = req?.file?.path

    if (!userImagePath) {
        throw new ApiError(400, "User Image is Required", ['User Image is Required'])
    }

    // 4.Upload image on cloudinary and get url of it.
    const userImageLink = await uploadOnCloudinary(userImagePath);

    if (!userImageLink)
        throw new ApiError(400, "Upload User Image Again !", ['Upload User Image Again !'])

    //5.Now we can add new user to db save to db.

    const user = await User.create({
        fullName,
        "email": email.toLowerCase(),
        age,
        password,
        userImage: userImageLink.url
    })

    const createdUser = await User.findById(user._id).select(
        '-password -_id'
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user",
            ['Something went wrong while registering the user']
        )
    }

    const tokens = await generateAccessAndRefereshTokens(user._id);
    if (tokens) {

        const message = `Yor are receiving this email because you (or someone else) has requested for account creation on Blogger App. Please use this token to cofirm your email:\n${tokens.refreshToken}`;

        const info = await sendEmail({ email: createdUser.email, subject: 'Verify Email', message });

        if (!info) {
            // If Not able to send email, then delete user first.
            await createdUser.deleteOne(createdUser._id);
            throw new ApiError(
                500,
                "Something went wrong while registering the user email",
                ['Something went wrong while registering the user email']
            )
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = tokens;
        return res.status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(201, { "user": { refreshToken, ...createdUser }, accessToken }, "User registered successfully")
            )
    } else {
        // If Not able to send email, then delete user first.
        await createdUser.deleteOne(createdUser._id);
        throw new ApiError(
            500,
            "Something went wrong while registering the user",
            ['Something went wrong while registering the user']
        )
    }


})

export const userLogin = asyncHandler(async function (req: Request, res: Response) {
    //1. Get email password from req.body
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All fields are required", ['All fields are required'])
    }

    //2. Check For if user exits - by email
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(401, "Invalid Credentials", ['Invalid Credentials'])
    }

    // Check Password correct or not.
    //@ts-ignore
    const isPasswordCorrect = await isUserExist.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Credentials", ['Invalid Credentials'])
    }

    //@ts-ignore
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(isUserExist._id)

    if (accessToken) {
        const user = await User.findOne({ email }).select('-password -_id')

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, { user, accessToken }, "login successfull")
            )
    }
    else {
        throw new ApiError(500, "Something went wrong during login", ['Something went wrong during login'])
    }

})

export const verifyUser = asyncHandler(async function (req: Request, res: Response) {
    // 1. Get email and token
    // 2. check if user exist with that mail
    // 3. compare token with user exist refreshToken
    const { token, email } = req.body;
    if (!email || !token) {
        throw new ApiError(409, "Incorrect Credentials", ['Incorrect Credentials'])
    }
    //2. Check For if user exits - by email
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new ApiError(404, "User Not Found", ['User Not Found'])
    }

    const isTokenCorrect = (token === isUserExist.refreshToken);

    if (!isTokenCorrect) {
        throw new ApiError(404, "Invalid Code", ['Invalid Code'])
    }

    isUserExist.isVerified = true;
    await isUserExist.save();

    const user = await User.findOne({ email }).select('-password')

    return res.status(200).json(
        new ApiResponse(200, { user }, "user verified")
    )


})

export const forgotPassword = asyncHandler(async function (req: Request, res: Response) {
    // 1. Get email
    // 2. check if user exist with that mail
    // 3. send email with refreshToken
    // 3. compare token with user exist refreshToken
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required", ['Email is required'])
    }
    //2. Check For if user exits - by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User doesn't exit ", [`User doesn't exit`])
    }

    // Get Reset Token
    //@ts-ignore
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // const resetUrl = req.protocol + '://' + req.get('host') + '/resetpassword/' + resetToken;
    const resetUrl = `http://localhost:3333/resetpassword/` + resetToken;

    //Sent Mail of resetUrl 

    const message = `Yor are receiving this email because you (or someone else) has requested
	the reset of  your password. Please click on this link to change password : \n\n ${resetUrl}`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Change Password',
            message
        });
        return res.status(200).json(
            new ApiResponse(200, {}, "Email sent")
        )

    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        throw new ApiError(500, "Email could not be send ", [`Email could not be send`])
    }
})

export const resetPassword = asyncHandler(async function (req: Request, res: Response) {

    //1. Check the authenticity of the token,
    // Get hashed token
    const { resettoken } = req.params;
    const { password } = req.body;
    const resetPasswordToken = crypto.createHash('sha256').update(resettoken).digest('hex');

    //2. If token expire or not valid, throw error
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Token Not Valid ", [`Token Not Valid`])
    }
    //3. If valid - change current password of user with incoming password
    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    //4. send 200 status with password change 
    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
})

export const logOut = asyncHandler(async function (req: Request, res: Response) {

    const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 10 * 1000),
    }

    return res.status(200)
        .cookie("accessToken", "none", options)
        .json(
            new ApiResponse(200, {}, "logout successfully")
        )
})

export const refershAccessToken = asyncHandler(async (req: Request, res: Response) => {
    // const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    const incomingRefreshToken = req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, 'unauthorized request', ['unauthorized request'])
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            `${process.env.REFRESH_TOKEN_SECRET}`
        )

        //@ts-ignore
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token", ['Invalid refresh token'])
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const tokens = await generateAccessAndRefereshTokens(user._id)
        if (tokens) {
            const { accessToken, refreshToken: newRefreshToken } = tokens;
            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", newRefreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        { accessToken, "refreshToken": newRefreshToken },
                        "Access token refreshed"
                    )
                )
        } else {
            throw new ApiError(
                401,
                "Something went wrong while generating tokens",
                ['Something went wrong while generating tokens']
            )

        }

    } catch (error) {
        console.log("in catch ERROR ", error);
        throw new ApiError(401, "Invalid refresh token", ['Invalid refresh token'])
    }

})