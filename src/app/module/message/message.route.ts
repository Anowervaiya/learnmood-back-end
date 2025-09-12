
import express from 'express'
import { MessageController } from './message.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import { multerUpload } from '../../config/multer.config';
import { validateRequest } from '../../middlewares/validateRequest';
import { createMessageZodValidation } from './message.validation';
const router = express.Router()

router.get('/users', MessageController.getSidebarUsers);

router.post('/send/:id',
  checkAuth(...Object.values(Role)),
  multerUpload.array("files"),
  validateRequest(createMessageZodValidation),
  MessageController.sendMessage);

router.get('/receive/:id', MessageController.getMessages);//get 1 to 1 message not all message
router.patch('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);



export const MessageRoutes = router;
