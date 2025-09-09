import { Types } from 'mongoose';
import type {  AUTHPROVIDER, GENDER, IsActive, LANGUAGE, PRONOUN, Role } from './user.constant';
import type {  IFollowers, IImage } from '../../interfaces/global.interfaces';

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
  blood: string;
  password?: string;
  phone?: string;
  image: IImage;
  address?: string;
  isDeleted?: string;
  isVerified?: boolean;
  role?: Role;
  dob?: Date;
  isActive?: IsActive;
  gender: GENDER;
  pronoun?: PRONOUN;
  followers?: IFollowers[];
  followings?: IFollowers[];
  languages?: LANGUAGE[];
  auths?: IAuthProvider[];
}
