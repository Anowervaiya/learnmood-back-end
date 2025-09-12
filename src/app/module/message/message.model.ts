import { Schema, model } from 'mongoose';
import { MediaSchema } from '../../Schema/global.schema';
import type { IMessages } from './message.interface';

const MessageSchema = new Schema<IMessages>(
  {
    senderId: { type: Schema.Types.ObjectId, required: true, index: true , ref:"User" },
    receiverId: { type: Schema.Types.ObjectId, required: true, index: true , ref:"User" },
    media: { type: [MediaSchema], default: [] },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = model('Message', MessageSchema);
