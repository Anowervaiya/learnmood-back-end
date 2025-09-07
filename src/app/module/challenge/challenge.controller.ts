import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import type { JwtPayload } from "jsonwebtoken";
import type { IChallenge } from "./challenge.interface";
import { ChallengeServices } from "./challenge.service";


const createChallenge = catchAsync(async (req: Request, res: Response) => {

  const decodedToken = req.user as JwtPayload;

  const payload: IChallenge = {
    user: decodedToken?.userId,
    ...req.body,
    media: { url: (req.files as Express.Multer.File[])?.map(file => file.path) , type: "image"},
  };
  console.log(payload);
  const result = await ChallengeServices.createChallenge(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Challenge is created successfully',
    data:result
  });
});

const getAllChallenges = catchAsync(async (req: Request, res: Response) => {
  // const query = req.query;
  // const result = await ChallengeServices.getAllChallenges(query as Record<string, string>);
  // sendResponse(res, {
  //   statusCode: 200,
  //   success: true,
  //   message: 'Tours retrieved successfully',
  //   data: result.data,
  //   meta: result.meta,
  // });
});
const updateChallenge = catchAsync(async (req: Request, res: Response) => {
  const payload: IChallenge = {
    ...req.body,
    // images: (req.files as Express.Multer.File[]).map(file => file.path),
  };
  const result = await ChallengeServices.updateChallenge(req.params.id as string, payload);
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
  getAllChallenges,
  deleteChallenge,
  updateChallenge,
};
