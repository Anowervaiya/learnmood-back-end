import type { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import { success } from "zod";
import { envVars } from "../config/env";
// import { TErrorSources } from "../interfaces/error.types";
import { handlerDuplicateError } from "../errorHelpers/handleDuplicateError";
import { handleCastError } from "../errorHelpers/handleCastError";
import { handlerValidationError } from "../errorHelpers/handleValidationError";
import type { TErrorSources } from "../interfaces/error.types";
import { handlerZodError } from "../errorHelpers/handlerZodError";
import { deleteImageFromCLoudinary } from "../config/cloudinary.config";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

      if (req.file) {
        await deleteImageFromCLoudinary(req.file.path);
      }

      if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = (req.files as Express.Multer.File[]).map(
          file => file.path
        );

        await Promise.all(imageUrls.map(url => deleteImageFromCLoudinary(url)));
      }



  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = 'something went wrong!';

  //Duplicate error
  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Object ID error / Cast Error
  else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err.name === 'ZodError') {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }
  //Mongoose Validation Error
  else if (err.name === 'ValidationError') {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  }
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === 'development' ? err.stack : null,
  });
}