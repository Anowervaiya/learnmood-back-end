import { Schema, model, Types } from 'mongoose';

const CommentSchema = new Schema(
  {
    post: { type: Types.ObjectId, ref: 'Post', required: true, index: true },
    user: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  
  },
  { timestamps: true }
);

export const Comment=  model('Comment', CommentSchema);
