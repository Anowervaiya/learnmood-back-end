import { Types } from 'mongoose';

export interface IAuthProvider {
  provider: 'google' | 'credentials'; // "Google", "Credential"
  providerId: string;
}

export enum Role {
  // USER = 'USER',
  SENDER = 'SENDER',
  RECEIVER='RECEIVER',
  ADMIN = 'ADMIN',
  // MODERATOR = 'MODERATOR',
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isBlock?: boolean;
  isDeleted?: boolean;
  role: Role;
  auths: IAuthProvider[];
}
