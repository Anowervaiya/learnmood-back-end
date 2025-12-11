import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { JwtPayload } from "jsonwebtoken";
import type { IChallenge, IChallengeDay } from "./challenge.interface";
import { ChallengeServices } from "./challenge.service";
import { IDecodedPayload } from "../../interfaces/global.interfaces";


const createChallenge = catchAsync(async (req: Request, res: Response) => {
  
  const payload: IChallenge = {
    ...req.body,
    banner: (req.file as Express.Multer.File).path
  };

  const result = await ChallengeServices.createChallenge(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Challenge is created successfully',
    data:result
  });
});
const createChallengeDay = catchAsync(async (req: Request, res: Response) => {
  
  const payload: IChallengeDay = {
    ...req.body,
    notes: (req.files as Express.Multer.File[])?.map(file => file.path),
  };
  const result = await ChallengeServices.createChallengeDay(payload);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Challenge Day is created successfully',
    data:result
  });
});

const getAllChallenges = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await ChallengeServices.getAllChallenges(query );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Challenge retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getMyPurchasedChallenges = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as IDecodedPayload
  const query = req.query as Record<string, string>;
  const result = await ChallengeServices.getMyPurchasedChallenges(decodedToken.accountId, query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My purchased Challenge retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getChallengeDetails = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;
  const { id } = req.params;

  
  const result = await ChallengeServices.getChallengeDetails(id as string , decodedToken.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Challenge Details retrieved successfully',
    data: result,
  });
});
const updateChallenge = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const payload: IChallenge = {
    ...req.body,
    media: (req.files as Express.Multer.File[])?.map(file => ({
      url: file.path, 
      type: 'image',
    })),
  };
  const result = await ChallengeServices.updateChallenge(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Challenge is updated successfully',
    data: result,
  });
});

const deleteChallenge = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ChallengeServices.deleteChallenge(id );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Challenge is deleted successfully',
    data: result,
  });
});


export const ChallengeController = {
  createChallenge,
  createChallengeDay,
  getAllChallenges,getChallengeDetails,
  deleteChallenge,
  updateChallenge,getMyPurchasedChallenges
};
