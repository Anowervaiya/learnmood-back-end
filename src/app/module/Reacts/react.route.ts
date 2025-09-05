import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { Router } from 'express'
import { ReactController } from "./react.controller";

const router = Router()

/* ------------------ React TYPE ROUTES -------------------- */
router.get('/react-type',
  ReactController.getAllReactTypes
);

router.post(
  '/create-react-type',
  checkAuth(Role.ADMIN),
  // validateRequest(createReactTypeZodSchema),
  ReactController.createReactType
);

router.get('/react-type/:id',
  ReactController.getSingleReactType
);

router.patch(
  '/react-type/:id',
  checkAuth(Role.ADMIN),
  // validateRequest(createReactTypeZodSchema),
  ReactController.updateReactType
);

router.delete(
  '/react-type/:id',
  checkAuth(Role.ADMIN),
  ReactController.deleteReactType
);

export const ReactRoutes =  router;