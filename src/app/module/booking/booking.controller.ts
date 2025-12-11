import type { Request, Response } from "express";
// import catchAsync from "../utils/catchAsync";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { IDecodedPayload } from "../../interfaces/global.interfaces";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodeToken = req.user as IDecodedPayload
   
    const booking = await BookingService.createBooking(req.body, decodeToken);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });
});

const getUserBookings = catchAsync(
    async (req: Request, res: Response) => {
        const bookings = await BookingService.getUserBookings();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings,
        });
    }
);
const getSingleBooking = catchAsync(
    async (req: Request, res: Response) => {
        const booking = await BookingService.getBookingById();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Booking retrieved successfully",
            data: booking,
        });
    }
);

const getAllBookings = catchAsync(
    async (req: Request, res: Response) => {
         const query = req.query as Record<string, string>;
        const bookings = await BookingService.getAllBookings(query);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings.data,
            meta: bookings.meta,
        });
    }
);

const updateBookingStatus = catchAsync(
    async (req: Request, res: Response) => {

        const updated = await BookingService.updateBookingStatus(
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Booking Status Updated Successfully",
            data: updated,
        });
    }
);


export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus,
}