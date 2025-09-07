
import { catchAsync } from "../../utils/catchAsync";
import { PageServices } from "./page.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from 'http-status-codes'
import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

const createPage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const payload = {
    ...req.body,
  
    // logo: (req.file as Express.Multer.File)
   
 
  };

  const Page = await PageServices.createPage(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Page Created Successfully",
    data: Page
  })
})


// const updatePage = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const PageId = req.params.id;
//     const verifiedToken = req.Page;
//     const payload = req.body;
//     const Page = await PageServices.updatePage(
//       PageId,
//       payload,
//       verifiedToken as JwtPayload
//     );

//     // res.status(httpStatus.CREATED).json({
//     //     message: "Page Created Successfully",
//     //     Page
//     // })

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: 'Page Updated Successfully',
//       data: Page,
//     });
//   }
// );


const deletePage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const Id = req.params.id as string;


     await PageServices.deletePage(Id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Page  is deleted Successfully",
   data: null
  })
})

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
  getAllPages,
  getMe,
  deletePage,
  getSinglePage,
};