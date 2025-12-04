import { model, Schema, Types } from 'mongoose';
import { type IAuthProvider, type IFriendRequest, type IUser } from './user.interfaces';
import { FRIEND_REQUEST_STATUS, GENDER, IsActive, LANGUAGE, PRONOUN, Role } from './user.constant';
import {  imageSchema } from '../../Schema/global.schema';
import { BLOOD_GROUP } from '../blood/blood.constant';

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
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    nickname: { type: String },
    password: { type: String },
    phone: { type: String },
    interests: { type: Map, of: Number, default: {} },
    image: imageSchema ,
    address: { type: String },
    followingCount: { type: Number, default: 0 },
    bio: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    bloodGroup: {
      type: String,
      enum: Object.values(BLOOD_GROUP),
    },
    pronoun: {
      type: String,
      enum: Object.values(PRONOUN),
      required: false,
    },
    languages: {
      type: [String],
      enum: Object.values(LANGUAGE),
      required: false,
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
