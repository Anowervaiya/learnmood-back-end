import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { Page } from './page.model';
import type { IPage } from './page.interfaces';


const createPage = async (payload: IPage) => {
 
  return  await Page.create(payload);

};

const getAllPages = async () => {
  const Pages = await Page.find({});
  const totalPages = await Page.countDocuments();
  return {
    data: Pages,
    meta: {
      total: totalPages,
    },
  };
};

const getMe = async (PageId: string) => {
  const result = await Page.findById(PageId).select('-password');
  return {
    data: result,
  };
};
const getSinglePage = async (id: string) => {
  const result = await Page.findById(id).select('-password');
  return {
    data: result,
  };
};

const deletePage = async (id: string) => {
  const page = await Page.findById(id);

  if (!page) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Page does not exist');
  }

  const result = await Page.findOneAndDelete({ _id: id });
  return result;
};

export const PageServices = {
  createPage,
  getAllPages,
  getMe,
  deletePage,
  getSinglePage,
};
