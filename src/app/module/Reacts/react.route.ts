import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.constant";
import { ReactController } from "./react.controller";


const router = Router();


/* ------------------ React TYPE ROUTES -------------------- */

router.post(
  '/create',
  checkAuth(...Object.values(Role)),
  // multerUpload.array('files'),
  // validateRequest(createPostZodValidation),
  ReactController.createReact
);
router.get(
  '/',
  // checkAuth(...Object.values(Role)),
  
  ReactController.getAllReact
);

router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  ReactController.deleteReact
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  // multerUpload.array('files'),
  // validateRequest(updateTourZodSchema),
  ReactController.updateReact
);




export const ReactRoutes = router;
