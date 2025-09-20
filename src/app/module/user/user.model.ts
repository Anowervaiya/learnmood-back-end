import { model, Schema, Types } from 'mongoose';
import { type IAuthProvider, type IFriendRequest, type IUser } from './user.interfaces';
import { FRIEND_REQUEST_STATUS, GENDER, IsActive, LANGUAGE, PRONOUN, Role } from './user.constant';
import {  imageSchema } from '../../Schema/global.schema';

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
    blood: { type: String },
    dob: { type: Date },
    email: { type: String, required: true, unique: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    nickname: { type: String },
    password: { type: String },
    phone: { type: String },
    image: imageSchema,
    address: { type: String },
    bio: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followings: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FRIEND_REQUEST_STATUS),
      default: FRIEND_REQUEST_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const FriendRequest = model('FriendRequest', friendRequestSchema);

export const User = model('User', userSchema);
