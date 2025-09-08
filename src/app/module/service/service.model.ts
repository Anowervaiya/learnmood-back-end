import { Schema, model, Types } from 'mongoose'; // same levels you defined
import { COURSE_LEVEL, SERVICE_CATEGORY } from './service.constant';
import type { IService } from './service.interfaces';
import { MediaSchema } from '../post/post.model';



const ServiceSchema = new Schema<IService>(
  {
    page: { type: Schema.Types.ObjectId, ref: 'Page', required: true }, // Which Page/Academy it belongs to
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    category: {
      type: String,
      enum: Object.values(SERVICE_CATEGORY),
      required: true,
    },
    media: [MediaSchema],
    price: { type: Number, default: 0 },
    duration: { type: String, default: '' }, 
    level: {
      type: String,
      enum: Object.values(COURSE_LEVEL),
    },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Service = model('Service', ServiceSchema);
