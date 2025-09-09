import { catchAsync } from '../../utils/catchAsync';
import { PageServices } from './page.service';
import { sendResponse } from '../../utils/sendResponse';

import httpStatus from 'http-status-codes';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { IPage } from './page.interfaces';

const createPage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const payload: IPage = {
      ...req.body,
      image: {
        profile: files?.profile?.[0]?.path, // Cloudinary URL
        banner: files?.banner?.[0]?.path, // Cloudinary URL
      },
    };
    const Page = await PageServices.createPage(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Page Created Successfully',
      data: Page,
    });
  }
);
const createPageMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const PageMember = await PageServices.createPageMember(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Page Member Created Successfully',
      data: PageMember,
    });
  }
);

const updatePage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const payload: IPage = {
      ...req.body,
      image: {
        profile: files?.profile?.[0]?.path,
        banner: files?.banner?.[0]?.path,
      },
    };
    const Page = await PageServices.updatePage(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Page Updated Successfully',
      data: Page,
    });
  }
);

const deletePage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id as string;

   const result = await PageServices.deletePage(Id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Page  is deleted Successfully',
      data: result,
    });
  }
);
const deletePageMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.params.id as string;

    const result = await PageServices.deletePageMember(Id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Page  member is deleted Successfully',
      data: result,
    });
  }
);

const getAllPages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PageServices.getAllPages();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'All Pages Retrieved Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await PageServices.getMe(decodedToken.PageId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Your profile Retrieved Successfully',
      data: result.data,
    });
  }
);
const getSinglePage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await PageServices.getSinglePage(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Page Retrieved Successfully',
      data: result.data,
    });
  }
);
export const PageControllers = {
  createPage,
  createPageMember,
  getAllPages,
  getMe,
  deletePage,
  getSinglePage,
  deletePageMember,
  updatePage,
};
