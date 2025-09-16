import { Schema } from "mongoose";
import type {   IImage, IMedia } from "../interfaces/global.interfaces";



// export const followers = new Schema<IFollowers>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User' },
//   },
//   {
//     versionKey: false,
//     _id: false,
//   }
// );

export const imageSchema = new Schema<IImage>(
  {
    profile: { type: String},
    banner: { type: String },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export  const MediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
  },
  { _id: false }
);

