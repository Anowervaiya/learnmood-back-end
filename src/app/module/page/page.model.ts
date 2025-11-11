import { Schema, model, Types } from 'mongoose';
import { PAGE_CATEGORY, PAGE_ROLE } from './page.constant';
import type { IPage, IPageMember } from './page.interfaces';
import { imageSchema } from '../../Schema/global.schema';


const PageMemberSchema = new Schema<IPageMember>(
  {
    page: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: {type: String, trim: true},
    role: {
      type: String,
      enum: Object.values(PAGE_ROLE),
      default: PAGE_ROLE.user,
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const PageMember = model('PageMember', PageMemberSchema);


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
    followersCount: { type: Number, default: 0 },
    followingsCount: { type: Number, default: 0 },
    // Branding
    image: imageSchema,
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Page = model('Page', PageSchema);
