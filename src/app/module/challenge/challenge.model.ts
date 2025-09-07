import { Schema, model, Types } from 'mongoose';

const ChallengeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    category: {
      type: String,
      enum: ['language', 'coding', 'fitness', 'reading', 'habit','skill', 'other'],
      default: 'other',
    }, // Challenge type

    durationDays: { type: Number, default: 30 }, // e.g., 30-day challenge

    createdBy: { type: Types.ObjectId, ref: 'User', required: true },

    participants: [
      {
        user: { type: Types.ObjectId, ref: 'User', required: true },
        joinedAt: { type: Date, default: Date.now },
        progress: { type: Number, default: 0 }, // % completion or streak count
        completed: { type: Boolean, default: false },
      },
    ],

    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date }, // auto-calc = startsAt + durationDays

    // Engagement
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    comments: [
      { type: Types.ObjectId, ref: 'User' }
    ],

    // Gamification
    rewardPoints: { type: Number, default: 100 }, // Points earned if completed
    badges: { type: [String], default: [] }, // e.g., "Consistency Badge"

    // Visibility
    isPublic: { type: Boolean, default: true }, // private or public challenge
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming',
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
