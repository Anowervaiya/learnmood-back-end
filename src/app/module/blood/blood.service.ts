import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';
import httpStatus from 'http-status-codes';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { BloodDonor,  BloodRequest } from './blood.model';
import type { IBloodDonor, IBloodRequest } from './blood.interfaces';
import { User } from '../user/user.model';
import { BloodDonorSearchableFields, BloodReqSearchableFields } from './blood.constant';


const createBloodDonor = async (payload: IBloodDonor) => {
 

  return  await BloodDonor.create(payload);

};

const updateBloodDonor = async (id: string, payload: IBloodDonor) => {
  const ifBloodDonorExist = await BloodDonor.findById(id);

  if (!ifBloodDonorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'BloodDonor Not Found');
  }

 
};

const createBloodRequest = async (payload: IBloodRequest) => {
  
  return await BloodRequest.create(payload);
};

const getAllBloodDonors = async (query: Record<string, string>) => {
  if (!query.minAge) query.minAge = '18';

  const queryBuilder = new QueryBuilder(User.find(), query);

  const BloodDonorData = queryBuilder
    .filter()
    .search(BloodDonorSearchableFields)
    .sort()
    .fields()
    .paginate();
    // .populate('requestedBy', '_id name image');
  
  const [data, meta] = await Promise.all([
    BloodDonorData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getAllBloodRequests = async (query: Record<string, string>) => {

  const queryBuilder = new QueryBuilder(BloodRequest.find(), query);
  const BloodRequestData = queryBuilder
    .filter()
    .search(BloodReqSearchableFields)
    .sort()
    .fields()
    .paginate()
    .populate('requestedBy', '_id name image');
  

  const [data, meta] = await Promise.all([
    BloodRequestData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};
const deleteBloodDonor = async (id: string) => {
  const bloodDonor = await BloodDonor.findById(id);

  if (!bloodDonor) {
    throw new AppError(httpStatus.BAD_REQUEST, 'BloodDonor does not exist');
  }

  const result = await BloodDonor.findOneAndDelete({ _id: id });
  return result;
};
const deleteBloodRequest = async (id: string) => {
  const bloodRequest = await BloodRequest.findById(id);

  if (!bloodRequest) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'BloodDonor Request does not exist'
    );
  }

  return await BloodRequest.findOneAndDelete({ _id: id });
 
};

export const BloodServices = {
  createBloodDonor,
  getAllBloodDonors,
  deleteBloodDonor,
  updateBloodDonor,
  deleteBloodRequest,
  getAllBloodRequests,
  createBloodRequest,
};
