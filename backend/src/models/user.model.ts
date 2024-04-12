import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    age: {
        type: Number,
        requied: true,

    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    userImage: {
        type: String, // cloudinary url
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    refreshToken: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

},
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

userSchema.methods.comparePassword = async function (inputPassword: string) {
    return await bcrypt.compare(inputPassword, this.password)
}

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

userSchema.methods.getResetPasswordToken = function () {
    //Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash Token and set to resetPasswordToken field
    //when user send its resetToken we will check if resetToken
    //valid or not
    this.resetPasswordToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex')

    //Set Expiration time to 10 min of resetPasswordExpire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}


export const User = mongoose.model('User', userSchema)