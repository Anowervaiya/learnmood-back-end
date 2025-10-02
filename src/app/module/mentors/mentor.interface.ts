import type mongoose from "mongoose";

export interface IMentor extends Document {
  userId: mongoose.Types.ObjectId;
  bio: string;
  subject: string[];
  experienceYears: number;
  education: string;
  location: string;
  duration: string;
  monthlyRate: number;
  createdAt: Date;
}
