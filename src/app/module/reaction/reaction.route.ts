import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.constant";
import { ReactController } from "./reaction.controller";
import { PAGE_ROLE } from "../page/page.constant";


const router = Router();


/* ------------------ React TYPE ROUTES -------------------- */

router.post(
  '/',
  checkAuth([...Object.values(Role), ...Object.values(PAGE_ROLE)]),
  ReactController.createReact
);


// GET reacts by entityId & entityType
router.get(
  '/all-reacts',
  ReactController.getAllReact // expects query params: entityId, entityType
);

router.get(
  '/',
  ReactController.getMyReact // expects query params: entityId, entityType, accountId
);


// router.delete(
//   '/:id',
//   checkAuth([...Object.values(Role), ...Object.values(PAGE_ROLE)]),
//   ReactController.deleteReact
// );
// router.patch(
//   '/:id',
//   checkAuth([...Object.values(Role), ...Object.values(PAGE_ROLE)]),
//   ReactController.updateReact
// );




export const ReactRoutes = router;
