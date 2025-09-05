import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReactService } from "./react.service";

const getSingleReactType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await ReactService.getSingleReactType(id );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React type retrieved successfully',
    data: result,
  });
});
const getAllReactTypes = catchAsync(async (req: Request, res: Response) => {

  const result = await ReactService.getAllReactTypes(
   
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React types retrieved successfully',
    data: result,
  });
});

const createReactType = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ReactService.createReactType(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'React type created successfully',
    data: result,
  });
});

const updateReactType = catchAsync(async (req: Request, res: Response) => {
  const  id  = req.params.id as string;
  const payload = req.body;
  const result = await ReactService.updateReactType(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React type updated successfully',
    data: result,
  });
});
const deleteReactType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params ;
  const result = await ReactService.deleteReactType(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'React type deleted successfully',
    data: result,
  });
});

export const ReactController = {

  createReactType,
  getAllReactTypes,
  getSingleReactType,
  deleteReactType,
  updateReactType,
 
};
