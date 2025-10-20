import { model, Schema } from "mongoose";
import { EntityType } from "../../constant/constant";
import type { IParticipant } from "./participant.interface";

// 👥 Participant Schema
const ParticipantSchema = new Schema<IParticipant>(
  {
    entityId: { type: Schema.Types.ObjectId, required: true, index: true },
    entityType: {
      type: String,
      enum: Object.values(EntityType),
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    joinedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

export const Participant = model('Participant', ParticipantSchema);
