import type { Types } from "mongoose";
import type { PAGE_CATEGORY, PAGE_ROLE } from "./page.constant";

export interface IPage {
  name: string;
  description?: string;
  owner: Types.ObjectId; // Who created this page
  category: PAGE_CATEGORY;
  logo?: string;
  coverImage?: string;
  isPublic: boolean;
}

export interface IPageMember {
  page: Types.ObjectId;
  user: Types.ObjectId;
  bio?: string;
  role: PAGE_ROLE;
  joinedAt?: Date;
}