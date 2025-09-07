import type { Types } from "mongoose";
import type { PAGE_CATEGORY } from "./page.constant";

export interface IPage {
  name: string;
  description?: string;
  owner: Types.ObjectId; // Who created this page
  category: PAGE_CATEGORY;
  logo?: string;
  coverImage?: string;
  isPublic: boolean;
}
