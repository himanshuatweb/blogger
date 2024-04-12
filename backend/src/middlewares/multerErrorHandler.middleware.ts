import multer from "multer";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";


export function multerErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof multer.MulterError) {
        console.log("MULter error ", err)
        // Multer error occurred
        if (err.code === 'LIMIT_FILE_SIZE') {
            // File too large error
            return res.status(400).json(new ApiError(
                400,
                'File too large.',
                ['File too large.']
            )
            );
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json(new ApiError(
                400,
                'Too many files.',
                ['Too many files.']
            )
            );
        }
        // Other Multer errors
        return res.status(500).json(
            new ApiError(
                500,
                'File upload failed.',
                ['File upload failed.']
            )
        )
    } else if (err) {
        if (err instanceof ApiError) {
            return res.status(err.statusCode).json({ ...err });
        }

        // Non-Multer errors
        return res.status(500).json(
            new ApiError(
                500,
                'Internal server error.',
                ['Internal server error.']
            )
        )
    }

    next(); // Continue to the next middleware or route handler
}

