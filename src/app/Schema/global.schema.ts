import { model, Schema } from 'mongoose';
import type { IImage, IMedia } from '../interfaces/global.interfaces';
import { EntityType, MEDIA_TYPE } from '../constant/constant';

export const imageSchema = new Schema<IImage>(
  {
    profile: { type: String },
    banner: { type: String },
  },
  {
    versionKey: false,
    _id: false,
  }
);

export const MediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(MEDIA_TYPE),
      default: MEDIA_TYPE.image,
    },
  },
  { _id: false }
);


