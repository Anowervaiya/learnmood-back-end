import { Schema, model, Types } from 'mongoose';
import { VISIBILITY } from '../../constant/constant';
import type { IStory } from './story.interface';


const MediaSchema = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
  },
  { _id: false }
);

const StorySchema = new Schema<IStory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    content: { type: String, default: '' },
    media: { type: MediaSchema, default: {} },
    tag: { type: [Schema.Types.ObjectId], default: [] },
    visibility: {
      type: String,
      enum: [...Object.values(VISIBILITY)],
      default: VISIBILITY.PUBLIC,
    },
  },
  { timestamps: true }
);

export const Story = model('Story', StorySchema);
