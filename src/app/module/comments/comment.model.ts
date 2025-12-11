import { Schema, model } from 'mongoose';
import { ACCOUNT_TYPE, EntityType } from '../../constant/constant';
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
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'accountType'
    },
    accountType: {
      type: String,
      enum: Object.values(ACCOUNT_TYPE),
      required: true
    },
    content: { type: String, required: true },

  },
  { timestamps: true }
);

export const Comment = model('Comment', CommentSchema);
