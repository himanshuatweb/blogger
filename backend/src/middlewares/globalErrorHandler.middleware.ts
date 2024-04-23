import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError";

function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ApiError) {
        // Handle if err instanceof ApiError
        return res.status(err.statusCode).json({ ...err });
    }
    else if (err instanceof mongoose.Error.CastError) {
        // Handle CastError: Cast to ObjectId failed for value
        return res.status(400).json(
            new ApiError(400, 'Invalid ID format', ['The provided ID is not valid'])
        )
    }
    else if (err.code === 11000 && err.name === 'MongoServerError') {
        return res.status(400).json(
            new ApiError(400, 'Blog with this title already exists', ['Blog with this title already exists'])
        )
    }
    else {
        // Forward other errors to the default Express error handler
        next(err);
    }


}

export default globalErrorHandler;