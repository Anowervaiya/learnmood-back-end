import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.constant";
import { ReviewController } from "./review.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createReviewZodValidation } from "./review.validation";


const router = Router();

router.post(
  '/create',
  checkAuth(...Object.values(Role)),
  validateRequest(createReviewZodValidation),
  ReviewController.createReview
);

router.get(
  '/',
  checkAuth(...Object.values(Role)),
  ReviewController.getAllReview
);

router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  ReviewController.deleteReview
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  ReviewController.updateReview
);




export const ReviewRoutes = router;
