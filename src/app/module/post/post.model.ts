import { Schema, model, Types } from 'mongoose';
import { VISIBILITY } from '../../constant/constant';
import type { IPost } from './post.interface';
import type { IMedia } from '../../interfaces/global.interfaces';

const MediaSchema = new Schema<IMedia>(
  {
    url: { type: [String], required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, default: '' },
    media: { type: [MediaSchema], default: [] },
    tag: { type: [String], default: [] },
    visibility: {
      type: String,
      enum: [...Object.values(VISIBILITY)],
      default: VISIBILITY.PUBLIC,
    },
    
  },
  { timestamps: true }
);

export const Post = model('Post', PostSchema);
