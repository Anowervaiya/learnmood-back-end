import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { Service } from './service.model';
import type { IService } from './service.interfaces';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import type { IMedia } from '../../interfaces/global.interfaces';

const createService = async (payload: IService) => {
  //  console.log(payload);
  return await Service.create(payload);
};
const updateService = async (id: string, payload: IService) => {
  const ifServicExist = await Service.findById({_id:id});

  if (!ifServicExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service is Not Found');
  }

  const updatedUser = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

if (payload.media && ifServicExist.media) {
  await Promise.all(
    ifServicExist.media.map((media: IMedia) =>
      deleteImageFromCLoudinary(media.url)
    )
  );
}

  return updatedUser;
};
const getAllServices = async () => {
  const Services = await Service.find({});
  const totalServices = await Service.countDocuments();
  return {
    data: Services,
    meta: {
      total: totalServices,
    },
  };
};

const getSingleService = async (id: string) => {
  const result = await Service.findById(id).select('-password');
  return {
    data: result,
  };
};

const deleteService = async (id: string) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service does not exist');
  }

  return await Service.findOneAndDelete({ _id: id });
};

export const ServiceServices = {
  createService,
  getAllServices,

  deleteService,
  getSingleService,
  updateService,
};
