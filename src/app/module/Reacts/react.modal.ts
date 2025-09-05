import { model, Schema } from 'mongoose';
import type { IReact, IReactType } from './react.interface';

const reactTypeSchema = new Schema<IReactType>(
  {
    type: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const ReactType = model<IReactType>('ReactType', reactTypeSchema);









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
