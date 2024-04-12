import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ApiError) {
        // Handle ApiError
        return res.status(err.statusCode).json({ ...err });
    } else {
        // Forward other errors to the default Express error handler
        next(err);
    }


}

export default globalErrorHandler;