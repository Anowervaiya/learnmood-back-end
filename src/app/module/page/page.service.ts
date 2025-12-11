import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { Page, PageMember } from './page.model';
import type { IPage, IPageMember } from './page.interfaces';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { PAGE_ROLE, PageSearchableFields } from './page.constant';


import jwt from "jsonwebtoken";
import { generateToken } from '../../utils/jwt';
import { createPageTokens } from '../../utils/userTokens';
import { setAuthCookie } from '../../utils/setCookie';

const switchToPage = async ( userId: string, pageId: string) => {
  
  // 1. Page exists check
  const page = await Page.findById(pageId);
  if (!page) {
    throw new AppError(httpStatus.NOT_FOUND, 'Page Not Found');
  }
  const pageMember = await PageMember.findOne({
    page: pageId,
    user: userId,
  });

   if(!pageMember){
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not page member");
  }



  // 3. Create Page Identity Token
 const pageTokens = createPageTokens({userId, pageId , role: pageMember?.role});
  
  return {
   pageTokens,
    page: {
      id: page._id,
      name: page.name,
      profile: page.image?.profile,
      banner: page.image?.banner,
    }
  };
};


const getMe = async (pageId: string) => {
  const user = await Page.findById(pageId).select('-password');
  return {
    data: user,
  };
};

const createPage = async (payload: IPage) => {
 
  const page=  await Page.create(payload);

   await PageMember.create({
    page: page._id,
    user: payload.owner,
    role: PAGE_ROLE.admin,
  });

  return page;


};

const updatePage = async (id: string, payload: IPage) => {
  const ifPageExist = await Page.findById(id);

  if (!ifPageExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Page Not Found');
  }

 
    // Build update object with $set for nested fields
    const updateData: any = { ...payload };
    
    // Handle image updates separately to preserve existing values
    if (payload?.image) {
      delete updateData.image; // Remove image from main update
      
      // Only update the fields that are provided
      if (payload.image.profile) {
        updateData['image.profile'] = payload.image.profile;
        // Delete old profile image from cloudinary
        if (ifPageExist?.image?.profile) {
          await deleteImageFromCLoudinary(ifPageExist.image.profile);
        }
      }
      
      if (payload.image.banner) {
        updateData['image.banner'] = payload.image.banner;
        // Delete old banner image from cloudinary
        if (ifPageExist?.image?.banner) {
          await deleteImageFromCLoudinary(ifPageExist.image.banner);
        }
      }
    }
  
    const updatedPage = await Page.findByIdAndUpdate(
      id, 
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );
  
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
    .paginate()
    .populate('owner', 'name email image')

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
  switchToPage,getMe,
  createPage,
  getAllPages,
  deletePage,
  updatePage,
  deletePageMember,
  getAllPageMembers,
  createPageMember,
  getMyPage,
};
