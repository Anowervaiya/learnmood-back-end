import { Schema, model, Types } from 'mongoose';
import { VISIBILITY } from './post.interface';
import { reactSchema } from '../Reacts/react.model';

const MediaSchema = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
  },
  { _id: false }
);

const PostSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, default: '' },
    media: { type: [MediaSchema], default: [] },
    tags: { type: [String], default: [] },
    reacts: [{ type: Types.ObjectId, ref: 'React' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
    visibility: {
      type: String,
      enum: [...Object.values(VISIBILITY)],
      default: VISIBILITY.PUBLIC,
    },
  },
  { timestamps: true }
);

export const Post = model('Post', PostSchema);
