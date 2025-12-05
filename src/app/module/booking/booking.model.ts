import { model, Schema } from "mongoose";
import { BOOKING_STATUS, type IBooking } from "./booking.interface";
import { EntityType } from "../../constant/constant";


const bookingSchema = new Schema<IBooking>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    entityId: { type: Schema.Types.ObjectId, refPath: 'entityType', required: true, index: true },
    entityType: {
        type: String,
        enum: Object.values(EntityType), // Add more entity names if needed
        required: true,
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment"
    },
    status: {
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING
    },

}, {
    timestamps: true
})

export const Booking = model<IBooking>("Booking", bookingSchema)