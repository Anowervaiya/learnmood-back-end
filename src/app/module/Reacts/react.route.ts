import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.constant";
import { ReactController } from "./react.controller";


const router = Router();


/* ------------------ React TYPE ROUTES -------------------- */

router.post(
  '/',
  checkAuth(...Object.values(Role)),
  ReactController.createReact
);


// GET reacts by entityId & entityType
router.get(
  '/',
  ReactController.getAllReact // expects query params: entityId, entityType
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
