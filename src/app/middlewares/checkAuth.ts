

import httpStatus from 'http-status-codes';
import AppError from '../errorHelpers/appError';
import { verifyToken } from '../utils/jwt';
import { envVars } from '../config/env';

import { User } from '../module/user/user.model';
import type { JwtPayload } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';


export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, 'No Token Recieved');
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist');
      }
      if (isUserExist.isBlock) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is block`);
      }
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
      }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, 'You are not permitted to view this route!!!');
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log('jwt error', error);
      next(error);
    }
  };
