import type { Types } from "mongoose";
import type { IImage } from "../../interfaces/global.interfaces";
import type {
  BLOOD_GROUP,
  BLOOD_URGENCY_LEVEL,
  BLOOD_REQUEST_STATUS,
} from './blood.constant';

interface IDonationHistory {
  date: Date;
  location: string;
  recipient: Types.ObjectId;
  quantity: number;
}
export interface IBloodDonor {
  user: Types.ObjectId; // Who created this page
  bloodGroup: BLOOD_GROUP;
  location: string;
  donationHistory?: IDonationHistory[];
}
export interface IBloodRequest {
  requestedBy: Types.ObjectId; // Who created this page
  bloodGroup: BLOOD_GROUP;
  location: string;
  hospital?: string;
  contactNumber: string;
  details?: string;
  urgencyLevel: BLOOD_URGENCY_LEVEL;
  status?: BLOOD_REQUEST_STATUS;
}

