import { Schema, model } from 'mongoose';
import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from './challenge.contant';
import type { IChallenge, IParticipant } from './challenge.interface';
import type { IMedia } from '../../interfaces/global.interfaces';
// media schema
const MediaSchema = new Schema<IMedia>(
  {
    url: { type: [String], required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
  },
  { _id: false }
);
// participant Schema
const ParticipantSchema = new Schema<IParticipant>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    joinedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    category: {
      type: String,
      enum: Object.values(CHALLENGE_CATEGORY),
      default: CHALLENGE_CATEGORY.other,
    }, // Challenge type
    media: { type: [MediaSchema], default: [] },
    durationDays: { type: Number, default: 30 }, // e.g., 30-day challenge

    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    participants: [ParticipantSchema],

    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date }, // auto-calc = startsAt + durationDays

  

    // Gamification
    rewardPoints: { type: Number, default: 100 }, // Points earned if completed
    badges: { type: [String], default: [] }, // e.g., "Consistency Badge"
    ratings: { type: Number, default: 0 },
    // Visibility
    isPublic: { type: Boolean, default: true }, // private or public challenge
    status: {
      type: String,
      enum: Object.values(CHALLENGE_STATUS),
      default: CHALLENGE_STATUS.ongoing,
    },
  },
  { timestamps: true }
);

// Auto set endsAt
ChallengeSchema.pre('save', function (next) {
  if (this.startsAt && this.durationDays) {
    this.endsAt = new Date(
      this.startsAt.getTime() + this.durationDays * 24 * 60 * 60 * 1000
    );
  }
  next();
});

export const Challenge= model('Challenge', ChallengeSchema);
