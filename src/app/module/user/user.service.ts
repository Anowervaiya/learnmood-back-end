
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";

import bcryptjs from "bcryptjs"
import httpStatus from "http-status-codes"
import { User } from "./user.model";
import { Role, type IAuthProvider, type IUser,  } from "./user.interfaces";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, role, ...rest } = payload;
  const capitalizedRole = role?.toUpperCase()
  if (capitalizedRole === Role.ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "you can't register as a admin , please register as a sender or reciever"
    );
  }
console.log(password);
 const isUserExist = await User.findOne({ email });

 if (isUserExist) {
   throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exist');
  }
  if (!password) {
    throw new AppError(401,'password does not exist')
  }

    const hashedPassword = await bcryptjs.hash(
      password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

   const authProvider: IAuthProvider = {
     provider: 'credentials',
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

const blockUser = async (id: string, status: boolean) => {
  
  const user = await User.findById(id);
  
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user does not exist');
  }

  if (user.isBlock === status) {
   throw new AppError(403, `user is already ${user.isBlock === true ? 'blocked' : 'unblock'}`)
 }

  


  const changableUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        isBlock: status,
      },
      
    },
    { new: true, runValidators: true }
  );

  return changableUser;
};

const deleteUser = async (id: string,) => {

  const user = await User.findById(id)

 if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user does not exist');
  }

  const result = await User.findOneAndDelete({_id : id})
  return result;
};

export const UserServices = {
  createUser,
  getAllUsers,
  blockUser,
  deleteUser,
};