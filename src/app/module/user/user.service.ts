import { envVars } from '../../config/env';
import AppError from '../../errorHelpers/appError';

import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { FriendRequest, User } from './user.model';
import { type IAuthProvider, type IUser } from './user.interfaces';
import { AUTHPROVIDER, FRIEND_REQUEST_STATUS, Role, userSearchableFields } from './user.constant';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/QueryBuilder';
import type {  Types } from 'mongoose';

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

     if (payload?.image?.profile && ifUserExist.image.profile) {
       await deleteImageFromCLoudinary(ifUserExist.image.profile);
     }
     if (payload.image.banner && ifUserExist.image.banner) {
       await deleteImageFromCLoudinary(ifUserExist.image.banner);
     }

  return updatedUser;

};

const getAllUsers = async (query:Record<string,string>) => {


  const queryBuilder = new QueryBuilder(User.find(), query)
  
  const userData = queryBuilder
        .search(userSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()
  
    const [data, meta] = await Promise.all([
      userData.build(),
      queryBuilder.getMeta(),
    ]);

    return {
      data,
      meta,
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

const getRecommendedUsers = async (userId: string) => {
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    throw new AppError(401, "user doesn't exist");
  }

  const friendRequestUsers = await FriendRequest.find({
    $or: [{ sender: userId }, { recipient: userId }],
  });


  const allFriendRequestUserIds : any = [];

  // Iterate through the array and add sender and recipient IDs to the Set
  await friendRequestUsers.forEach(request => {
    allFriendRequestUserIds.push(request.sender.toString());
    allFriendRequestUserIds.push(request.recipient.toString());
  });

  
  const recommendedUsers = await User.find({
    $and: [
      { _id: { $ne: currentUser._id } },
      { _id: { $nin: currentUser.friends } },
      { _id: { $nin: allFriendRequestUserIds } },
    ],
  });

  return { data: recommendedUsers };
}

const getMyFriends = async (userId: string) => {
  const user = await User.findById(userId)
    .select("friends -_id")
    .populate("friends", "name image")
  
  if (!user) {
    throw new AppError(401, "user doesn't exist")
  }

  return { data: user}
}

const sendFriendRequest = async (payload: {
  myId: Types.ObjectId;
  recipientId: Types.ObjectId;
}) => {
  const recipient = await User.findById(payload.recipientId);
  if (!recipient) {
    throw new AppError(401, "recipent doesn't exist");
  }

  if (recipient.friends?.includes(payload.myId)) {
    throw new AppError(401, 'You are already friends with this user');
  }

  const existingRequest = await FriendRequest.findOne({
    $or: [
      {sender : payload.myId , recipient: payload.recipientId},
      {sender : payload.recipientId , recipient: payload.myId}
    ],
  })

  if (existingRequest) {
    throw new AppError(
      400,
      'A friend request already exists between you and this user'
    );
  }

      const friendRequest = await FriendRequest.create({
        sender: payload.myId,
        recipient: payload.recipientId,
      });

  return {data: friendRequest}




};

const changeStatusOfFreindRequest = async (payload: {
  myId: string;
  requestId: string;
  status:FRIEND_REQUEST_STATUS
}) => {
  const friendRequest = await FriendRequest.findById(payload.requestId);

  if (!friendRequest) {
    throw new AppError(401, 'Friend request not found');
  }

  // Verify the current user is the recipient
  if (friendRequest.recipient.toString() !== payload.myId) {
    throw new AppError(401, 'You are not authorized to accept this request');
  }

  friendRequest.status = payload.status;
  await friendRequest.save();
  
  // add each user to the other's friends array
  // $addToSet: adds elements to an array only if they do not already exist.
  await User.findByIdAndUpdate(friendRequest.sender, {
    $addToSet: { friends: friendRequest.recipient },
  });
  await User.findByIdAndUpdate(friendRequest.recipient, {
    $addToSet: { friends: friendRequest.sender },
  });
};

const getFriendRequests = async (userId: string) => {

  const incomingReqs = await FriendRequest.find({
    recipient: userId,
    status:  FRIEND_REQUEST_STATUS.PENDING,
  }).populate('sender', 'name image');

  const acceptedReqs = await FriendRequest.find({
    sender: userId,
    status: FRIEND_REQUEST_STATUS.ACCEPTED,
  }).populate('recipient', 'name image');

  return { data: { incomingReqs, acceptedReqs } }
}

const getOutgoingFriendRequest = async (userId: string) => {
  const outgoingRequests = await FriendRequest.find({
    sender: userId,
    status: FRIEND_REQUEST_STATUS.PENDING,
  }).populate(
    'recipient',
    'name image'
  );
  
  return {data: outgoingRequests}
};

export const UserServices = {
  createUser,
  getAllUsers,
  getMe,
  deleteUser,
  getSingleUser,
  updateUser,
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  changeStatusOfFreindRequest,
  getFriendRequests,
  getOutgoingFriendRequest,
};
