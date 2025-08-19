import { model, Schema } from "mongoose";
import { type IAuthProvider, type IUser, Role } from "./user.interfaces";

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
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
     default: Role.RECEIVER
    },
    isBlock:{type:Boolean , default : false},
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