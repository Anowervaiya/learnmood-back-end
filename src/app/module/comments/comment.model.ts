import { Schema, model } from 'mongoose';
import { EntityType } from '../../constant/constant';
import type { IComments } from './comment.interface';
import { MediaSchema } from '../../Schema/global.schema';

const CommentSchema = new Schema<IComments>(
  {
    entityId: { type: Schema.Types.ObjectId, required: true, refPath: 'entityType', index: true },
    entityType: {
      type: String,
      enum: Object.values(EntityType),
      required: true,
    },
    media: { type: [MediaSchema], default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },

  },
  { timestamps: true }
);

export const Comment = model('Comment', CommentSchema);
