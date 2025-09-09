import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";

import { validateRequest } from "../../middlewares/validateRequest";

import { createStoryZodValidation, updateStoryZodValidation } from "./story.validation";
import { multerUpload } from "../../config/multer.config";
import { StoryController } from "./story.controller";
import { Role } from "../user/user.constant";

const router = Router()

router.post(
  '/create',
  checkAuth(...Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(createStoryZodValidation),
  StoryController.createStory
);

router.get('/', StoryController.getAllStories); //Querybuilder

router.delete(
  '/:id',
  checkAuth(...Object.values(Role)),
  StoryController.deleteStory
);
router.patch(
  '/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.array('files'),
  validateRequest(updateStoryZodValidation),
  StoryController.updateStory
);

export const StoryRoutes = router;