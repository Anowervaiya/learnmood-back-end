import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { MentorServices } from './mentor.service';
import { sendResponse } from '../../utils/sendResponse';
import type { IMentor } from './mentor.interface';
import type { JwtPayload } from 'jsonwebtoken';

const createMentor = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload;

  const payload: IMentor = {
    userId: decodedToken?.userId,
    ...req.body
  };

  console.log(payload)

  const result = await MentorServices.createMentor(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Mentor is created successfully',
    data: result,
  });
});

const getAllMentors = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;

  const result = await MentorServices.getAllMentors(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Mentors retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const updateMentor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const payload: IMentor = {
    ...req.body
  };
  const result = await MentorServices.updateMentor(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mentor is updated successfully',
    data: result,
  });
});

const deleteMentor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MentorServices.deleteMentor(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Mentor is deleted successfully',
    data: result,
  });
});

export const MentorController = {
  createMentor,
  getAllMentors,
  deleteMentor,
  updateMentor,
};
