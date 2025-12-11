import httpStatus from 'http-status-codes';
import AppError from '../errorHelpers/appError';
import { verifyToken } from '../utils/jwt';
import { envVars } from '../config/env';
import { User } from '../module/user/user.model';
import type { JwtPayload } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { IsActive } from '../module/user/user.constant';
import { PageMember } from '../module/page/page.model';

export const checkAuth =
  (requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;

      if (!accessToken) throw new AppError(403, "No Token Recieved");
 
      const decoded = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

      req.user = decoded;

      const user = await User.findById(decoded.userId);

      if (!user) throw new AppError(400, "User does not exist");
      if (user.isDeleted) throw new AppError(400, "User is deleted");

      // -------------------------------
      // USER MODE ROLE CHECK
      // -------------------------------
      if (decoded.accountType === "User") {
        if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
          throw new AppError(403, "Permission denied! (User Mode)");
        }
        return next();
      }

      // -------------------------------
      // PAGE MODE CHECK + ROLE CHECK
      // -------------------------------
      
      if (decoded.accountType === "Page") {
        const membership = await PageMember.findOne({
          user: decoded.userId,
          page: decoded.accountId,
        });


        if (!membership) {
          throw new AppError(401, "You are not a member of any page!");
        }

        const pageRole = membership.role; // admin, moderator

        if (requiredRoles.length > 0 && !requiredRoles.includes(pageRole)) {
          throw new AppError(403, "Permission denied! (Page Mode)");
        }

        return next();
      }

      next();
    } catch (error) {
      console.log("Auth error", error);
      next(error);
    }
  };
