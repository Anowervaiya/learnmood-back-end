import { Types } from 'mongoose';
import type {  AUTHPROVIDER, FRIEND_REQUEST_STATUS, GENDER, IsActive, LANGUAGE, PRONOUN, Role } from './user.constant';
import type {   IImage } from '../../interfaces/global.interfaces';

export interface IAuthProvider {
  provider: AUTHPROVIDER; // "Google", "Credential"
  providerId: string;
}



export interface IUser {
  _id?: Types.ObjectId;
  bio?: string;
  name: string;
  nickname?: string;
  email: string;
  password?: string;
  phone?: string;
  image?: IImage;
  address?: string;
  isDeleted?: string;
  isVerified?: boolean;
  role?: Role;
  dob?: Date;
  isActive?: IsActive;
  gender?: GENDER;
  pronoun?: PRONOUN;
  followers?: Types.ObjectId[];
  followings?: Types.ObjectId[];
  languages?: LANGUAGE[];
  auths?: IAuthProvider[];
  friends?: Types.ObjectId[];
  interests?: Map<string, number>;
}
export interface IFriendRequest {
  _id?: Types.ObjectId;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  status: FRIEND_REQUEST_STATUS;
}
