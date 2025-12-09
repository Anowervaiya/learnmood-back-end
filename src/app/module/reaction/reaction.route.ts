import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.constant";
import { ReactController } from "./reaction.controller";


const router = Router();


/* ------------------ React TYPE ROUTES -------------------- */

router.post(
  '/',
  checkAuth(...Object.values(Role)),
  ReactController.createReact
);


// GET reacts by entityId & entityType
router.get(
  '/all-reacts',
  ReactController.getAllReact // expects query params: entityId, entityType
);
router.get(
  '/',
  ReactController.getMyReact // expects query params: entityId, entityType, userId
);


router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  ReactController.deleteReact
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  ReactController.updateReact
);




export const ReactRoutes = router;
