import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import ApiError from "../utils/ApiError";
import { User } from "../models/user.model";

async function protectedRoute(req: Request, res: Response, next: NextFunction) {

    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token  from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies?.accessToken) {
        // Set token from Cookie
        token = req.cookies.accessToken;

    }

    // Make sure token exists
    if (!token) {
        return next(new ApiError(401, 'Not Authorized to access this route', ['Not Authorized to access this route']));
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        //@ts-ignore
        const user = await User.findById(decoded?._id);
        // If user not found, return 401
        if (!user) {
            return next(new ApiError(401, 'Not Authorized to access this route', ['User not found']));
        }

        //@ts-ignore
        req.user = user;
        next();
    } catch (err) {
        return next(new ApiError(401, 'Not Authorized to access this route', ['Not Authorized to access this route', err]));
    }


}

export default protectedRoute;