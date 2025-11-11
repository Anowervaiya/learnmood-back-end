import { Schema, model } from 'mongoose';
import type { IFollow } from './follow.interface';
import { FOLLOWER_TYPE } from './follow.constant';

const followSchema = new Schema<IFollow>(
  {
    follower: {
      id: {  type: Schema.Types.ObjectId,  required: true,   refPath: 'follower.type' },
      type: { type: String, enum: Object.values(FOLLOWER_TYPE),    required: true  },
    },
    following: {
      id: { type: Schema.Types.ObjectId, required: true,  refPath: 'following.type' },
      type: { type: String, enum: [FOLLOWER_TYPE.Page], required: true },
    },
  },
  { timestamps: true }
);

// Prevent duplicate follows
followSchema.index({ 'follower.id': 1, 'following.id': 1 }, { unique: true });

export const Follow = model<IFollow>('Follow', followSchema);
