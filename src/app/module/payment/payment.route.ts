import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { PaymentController } from "./payment.controller";
import { Role } from "../user/user.constant";


const router = express.Router();


router.post("/init-payment/:bookingId", PaymentController.initPayment);// those user did't complete payment and try to pay again
router.post("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
router.post("/validate-payment", PaymentController.validatePayment)
router.get("/invoice/:paymentId", checkAuth(...Object.values(Role)), PaymentController.getInvoiceDownloadUrl);
export const PaymentRoutes = router;