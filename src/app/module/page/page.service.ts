import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { Page, PageMember } from './page.model';
import type { IPage, IPageMember } from './page.interfaces';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { PageSearchableFields } from './page.constant';


const createPage = async (payload: IPage) => {
 

  return  await Page.create(payload);

};

const updatePage = async (id: string, payload: IPage) => {
  const ifPageExist = await Page.findById(id);

  if (!ifPageExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Page Not Found');
  }

  const updatedPage = await Page.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!payload.image || !ifPageExist.image) {
  throw new AppError(401, "image not found")
  }
  
  if (payload.image.profile && ifPageExist.image.profile) {
    await deleteImageFromCLoudinary(ifPageExist.image.profile);
  }
  if (payload.image.banner && ifPageExist.image.banner) {
    await deleteImageFromCLoudinary(ifPageExist.image.banner);
  }

  return updatedPage;
};
const createPageMember = async (payload: IPageMember) => {
  return await PageMember.create(payload);
};

const getAllPages = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Page.find(), query);

  const PageData = queryBuilder
    .search(PageSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    PageData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};
const getMyPage = async (userId: string) => {
  
 return await Page.find({ owner: userId });
  
};
const getAllPageMembers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(PageMember.find(), query);

  const PageMemberData = queryBuilder
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    PageMemberData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
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
const deletePageMember = async (id: string) => {
  const pageMember = await PageMember.findById(id);

  if (!pageMember) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Page member does not exist');
  }

  return await PageMember.findOneAndDelete({ _id: id });
 
};

export const PageServices = {
  createPage,
  getAllPages,
  deletePage,
  updatePage,
  deletePageMember,
  getAllPageMembers,
  createPageMember,
  getMyPage,
};
