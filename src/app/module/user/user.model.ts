import { model, Schema, Types } from 'mongoose';
import {
 

  type IAuthProvider,
  type IUser,
} from './user.interfaces';
import { GENDER, IsActive, LANGUAGE, PRONOUN, Role } from './user.constant';
import { followers, imageSchema } from '../../Schema/global.schema';


export const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);



const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    blood: { type: String, required: true },
    dob: { type: Date, },
    email: { type: String, required: true, unique: true },
    nickname: { type: String },
    password: { type: String },
    phone: { type: String },
    image:  imageSchema,
    address: { type: String },
    bio: { type: String },
    followers: [followers],
    followings: [followers],
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    pronoun: {
      type: String,
      enum: Object.values(PRONOUN),
    },
    languages: {
      type: [String],
      enum: Object.values(LANGUAGE),
    },

    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model('User', userSchema);
