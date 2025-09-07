import { Types } from 'mongoose';
import type { IsActive, Role } from './user.constant';


export interface IAuthProvider {
  provider: 'google' | 'credentials'; // "Google", "Credential"
  providerId: string;
}
export interface IFollowers {
  user: Types.ObjectId;
}

export interface IUser {
  _id?: Types.ObjectId;
  bio?: string;
  name: string;
  email: string;
  followers?: IFollowers[];
  followings?: IFollowers[];
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: boolean;
  role?: Role;
  auths?: IAuthProvider[];
  createdAt?: Date;
}
