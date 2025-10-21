import { Schema, model } from 'mongoose';
import { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from './challenge.contant';
import type {
  IChallenge,
  IChallengeDay
} from './challenge.interface';

const ChallengeDaySchema = new Schema<IChallengeDay>(
  {
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: 'Challenge',
      required: true,
    },
    dayNumber: { type: Number, required: true },
    title: { type: String, required: true },
    notes: { type: [String], default: [] },
    video: [
      {
        fileName: { type: String, required: true },
        fileType: { type: String, required: true },
        key: { type: String, required: true },
        uploadUrl: { type: String, required: true },
      },
    ],
    article: { type: String, default: '' },
    // quiz: [{ question, options, correctAnswer }]
  },
  { timestamps: true }
);

export const ChallengeDay = model('ChallengeDay', ChallengeDaySchema);


const ChallengeSchema = new Schema<IChallenge>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: Object.values(CHALLENGE_CATEGORY),
      default: CHALLENGE_CATEGORY.other,
    },
    banner: { type: String },
    durationDays: { type: Number, required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
    ratings: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: true },
    status: {
      type: String,
      enum: Object.values(CHALLENGE_STATUS),
      default: CHALLENGE_STATUS.ongoing,
    },
  },
  { timestamps: true }
);

// 🕒 Auto calculate end date
ChallengeSchema.pre('save', function (next) {
  if (this.startsAt && this.durationDays) {
    this.endsAt = new Date(
      this.startsAt.getTime() + this.durationDays * 24 * 60 * 60 * 1000
    );
  }
  next();
});

export const Challenge = model('Challenge', ChallengeSchema);
