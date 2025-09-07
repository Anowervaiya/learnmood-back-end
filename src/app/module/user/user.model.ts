import { model, Schema, Types } from 'mongoose';
import {
  type IAuthProvider,
  type IFollowers,
  type IUser,
} from './user.interfaces';
import { IsActive, Role } from './user.constant';

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const followers = new Schema<IFollowers>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    _id: false,
  }
);
const followings = new Schema<IFollowers>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: { type: String, default: '' },
    followers: [followers],
    followings: [followings],
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model('User', userSchema);
