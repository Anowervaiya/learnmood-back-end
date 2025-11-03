import { model, Schema } from "mongoose";
import type { IBloodDonor, IBloodRequest } from "./blood.interfaces";
import { BLOOD_GROUP, BLOOD_REQUEST_STATUS, BLOOD_URGENCY_LEVEL } from "./blood.constant";

const bloodDonorSchema = new Schema<IBloodDonor>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bloodGroup: {
      type: String,
      enum: Object.values(BLOOD_GROUP),
    },
    location: { type: String, required: true },
    donationHistory: [
      {
        date: { type: Date, default: Date.now },
        location: { type: String , required:true },
        quantity: { type: Number, default: 1 }, 
        recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
      },
    ],
  },
  { timestamps: true }
);

const bloodRequestSchema = new Schema<IBloodRequest>(
  {
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bloodGroup: {
      type: String,
      enum: Object.values(BLOOD_GROUP),
    },
    location: { type: String, required: true },
    hospital: { type: String },
    details: { type: String },
    contactNumber: { type: String, required: true },
    urgencyLevel: {
      type: String,
      enum: Object.values(BLOOD_URGENCY_LEVEL),
      default: BLOOD_URGENCY_LEVEL.normal,
    },
    status: {
      type: String,
      enum: Object.values(BLOOD_REQUEST_STATUS),
      default: BLOOD_REQUEST_STATUS.pending,
    },
  },
  { timestamps: true }
);



export const BloodDonor = model('BloodDonor', bloodDonorSchema);
export const BloodRequest = model('BloodRequest', bloodRequestSchema);