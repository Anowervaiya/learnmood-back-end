import type mongoose from "mongoose";

export interface IMentor extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  subject: string[];
  experienceYears: string;
  education: string;
  location: string;
  duration: string;
  studentCount?:number;
  monthlyRate: number;
  createdAt: Date;
}
