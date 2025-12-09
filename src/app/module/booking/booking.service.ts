/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { User } from "../user/user.model";
import { BOOKING_STATUS, type IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errorHelpers/appError";
import { getTransactionId } from "../../utils/getTransactionId";
import { Mentor } from "../mentors/mentor.model";
import type { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { Challenge } from "../challenge/challenge.model";



/**
 * Duplicate DB Collections / replica
 * 
 * Relica DB -> [ Create Booking -> Create Payment ->  Update Booking -> Error] -> Real DB
 */

const createBooking = async (payload: Partial<IBooking>, userId: string) => {

    const transactionId = getTransactionId()

    const session = await Booking.startSession();
    session.startTransaction()

    try {
        const user = await User.findById(userId);

        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please add address to your Profile to proceed with booking.")
        }

        let mentor;
        let challenge;
        let amount = 0 ;
        if(payload.entityType==='Mentor'){
            mentor = await Mentor.findById(payload.entityId)
        }
        
        if(payload.entityType==='Challenge'){
            challenge = await Challenge.findById(payload.entityId)
        }
        

    //   const mentor = await Mentor.findById(payload.entityId)
        

        if (mentor && !mentor?.monthlyRate) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Mentor Cost Found!")
        }
        if (challenge && !challenge?.price) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Challenge Price Found!")
        }

         if(mentor){
            amount = (mentor.monthlyRate) * (5/100);
         }
         if(challenge){
            amount= (challenge.price)* (5/100)
         }



        const booking = await Booking.create([{
            user: userId,
            status: BOOKING_STATUS.PENDING,
            ...payload
        }], { session })

      

        const payment = await Payment.create([{
            booking: booking[0]!._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount
        }], { session })

        const updatedBooking = await Booking
            .findByIdAndUpdate(
                booking[0]!._id,
                { payment: payment[0]!._id },
                { new: true, runValidators: true, session }
            )
            .populate("user")
            .populate("entityId")
            .populate("payment");

        const userAddress = (updatedBooking?.user as any)?.address
        const userEmail = (updatedBooking?.user as any)?.email
        const userPhoneNumber = (updatedBooking?.user as any)?.phone
        const userName = (updatedBooking?.user as any)?.name

        const sslPayload: ISSLCommerz = {
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            name: userName,
            amount: amount,
            transactionId: transactionId
        }

        const sslPayment = await SSLService.sslPaymentInit(sslPayload)

        await session.commitTransaction(); //transaction
        session.endSession()
        return {
            paymentUrl: sslPayment.GatewayPageURL,
            booking: updatedBooking
        }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
};

// Frontend(localhost:5173) - User - Tour - Booking (Pending) - Payment(Unpaid) -> SSLCommerz Page -> Payment Complete -> Backend(localhost:5000/api/v1/payment/success) -> Update Payment(PAID) & Booking(CONFIRM) -> redirect to frontend -> Frontend(localhost:5173/payment/success)

// Frontend(localhost:5173) - User - Tour - Booking (Pending) - Payment(Unpaid) -> SSLCommerz Page -> Payment Fail / Cancel -> Backend(localhost:5000) -> Update Payment(FAIL / CANCEL) & Booking(FAIL / CANCEL) -> redirect to frontend -> Frontend(localhost:5173/payment/cancel or localhost:5173/payment/fail)

const getUserBookings = async () => {

    return {}
};

const getBookingById = async () => {
    return {}
};

const updateBookingStatus = async (

) => {

    return {}
};

const getAllBookings = async (query:Record<string,string>) => {
  const queryBuilder = new QueryBuilder(Booking.find(), query)
  
  const userData = queryBuilder
        // .search(userSearchableFields)
        .filter()
        .sort()      
        .paginate()
  
    const [data, meta] = await Promise.all([
      userData.build(),
      queryBuilder.getMeta(),
    ]);

    return {
      data,
      meta,
    };

};


export const BookingService = {
    createBooking,
    getUserBookings,
    getBookingById,
    updateBookingStatus,
    getAllBookings,
};
