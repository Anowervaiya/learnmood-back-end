import { Schema, model, Types } from 'mongoose';
import { PAGE_CATEGORY } from './page.constant';
import type { IPage } from './page.interfaces';

const PageSchema = new Schema<IPage>(
  {
    name: { type: String, required: true, trim: true }, // Page/Academy name
    description: { type: String, default: '', trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Who created this page
    category: {
      type: String,
      enum: Object.values(PAGE_CATEGORY),
      default: PAGE_CATEGORY.other,
    },
    // Branding
    logo: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Page = model('Page', PageSchema);
