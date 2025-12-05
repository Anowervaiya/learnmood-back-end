// User - Booking(Pending) -> Payment (Unpaid) -> SSLCommerz -> Booking update = confirm -> Payment update = Paid

import { Types } from "mongoose";
import type { EntityType } from "../../constant/constant";


export enum BOOKING_STATUS {
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}

export interface IBooking {
    user: Types.ObjectId,
    entityType:EntityType,
    entityId: Types.ObjectId,
    payment?: Types.ObjectId,
    status: BOOKING_STATUS,
    createdAt?: Date
}