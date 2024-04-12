import { Request, Response } from "express";
import { User } from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResonse";
import uploadOnCloudinary from "../utils/uploadCloudinary";

/*
    @Access - Admin
*/ 
export const getAllUsers = asyncHandler(async function (req: Request, res: Response) {
    const users = await User.find();
    console.log("Users ", users)
    res.status(200).json(users);
}) 
