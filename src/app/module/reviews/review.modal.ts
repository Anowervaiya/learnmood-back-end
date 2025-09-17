import { model, Schema } from "mongoose";
import type { IReview } from "./review.interface";
import { EntityType } from "../../constant/constant";

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    entityId: { type: Schema.Types.ObjectId, required: true },
    entityType: { type: String, enum: Object.values(EntityType), required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    message: { type: String, maxlength: 1000 }, // optional review message
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });

export const Review = model<IReview>('Review', reviewSchema);
