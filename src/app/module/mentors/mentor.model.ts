import mongoose from 'mongoose';
import { model } from 'mongoose';
import type { IMentor } from './mentor.interface';

const MentorSchema = new mongoose.Schema<IMentor>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  userName: {type:String, required:true},
  subject: [{ type: String, required: true }],
  experienceYears: { type: String, required: true },
  education: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  monthlyRate: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Mentor = model('Mentor', MentorSchema);
