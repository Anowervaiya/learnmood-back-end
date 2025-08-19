import { model, Schema } from 'mongoose';
import type { IReact } from './react.interface';

 export const reactSchema = new Schema<IReact>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Prevent duplicate reacts by same user on same post
reactSchema.index({ user: 1, post: 1 }, { unique: true });

export const React = model<IReact>('React', reactSchema);
