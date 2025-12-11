import { Schema, model, Types } from 'mongoose';
import { VISIBILITY } from '../../constant/constant';
import type { IPost } from './post.interface';
import { MediaSchema } from '../../Schema/global.schema';


const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, default: '' },
    media: { type: [MediaSchema], default: [] },
    tag: { type: [String], default: [] },

    // Reaction counts for all types
    reactions: {
      type: Object,
      default: {}, // or new Map()
    },
    
    commentCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },

    visibility: {
      type: String,
      enum: [...Object.values(VISIBILITY)],
      default: VISIBILITY.PUBLIC,
    },

  },
  { timestamps: true }
);


export const Post = model('Post', PostSchema);
