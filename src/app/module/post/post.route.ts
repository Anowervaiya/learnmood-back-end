import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interfaces";
import { validateRequest } from "../../middlewares/validateRequest";
import { PostController } from "./post.controller";
import { createPostZodValidation } from "./post.validation";

const router = Router()

router.post(
  '/create',
  checkAuth(...Object.values(Role)),
  // multerUpload.array('files'),
  validateRequest(createPostZodValidation),
  PostController.createPost
);

export const PostRoutes = router;