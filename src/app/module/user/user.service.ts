import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { User } from './user.model';
import { type IAuthProvider, type IUser } from './user.interfaces';
import type { JwtPayload } from 'jsonwebtoken';
import { AUTHPROVIDER, Role } from './user.constant';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role, ...rest } = payload;
  const capitalizedRole = role?.toUpperCase();
  if (capitalizedRole === Role.ADMIN) {
    throw new AppError(httpStatus.FORBIDDEN, "you can't register as a admin ");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exist');
  }
  if (!password) {
    throw new AppError(401, 'password does not exist');
  }

  const hashedPassword = await bcryptjs.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: AUTHPROVIDER.credentials,
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    role: capitalizedRole,
    ...rest,
  });
  return user;
};

const updateUser = async(id : string, payload : IUser ) => {


  const ifUserExist = await User.findById(id);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  

  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

     if (payload.image.profile && ifUserExist.image.profile) {
       await deleteImageFromCLoudinary(ifUserExist.image.profile);
     }
     if (payload.image.banner && ifUserExist.image.banner) {
       await deleteImageFromCLoudinary(ifUserExist.image.banner);
     }

  return updatedUser;

};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  return {
    data: user,
  };
};
const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select('-password');
  return {
    data: user,
  };
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user does not exist');
  }

  const result = await User.findOneAndDelete({ _id: id });
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getMe,
  deleteUser,
  getSingleUser,
  updateUser,
};
