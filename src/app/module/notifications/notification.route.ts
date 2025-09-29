
import express from 'express'
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.constant';
import { NotificationController } from './notification.controller';

const router = express.Router()

router.get('/', checkAuth(...Object.values(Role)), NotificationController.getNotifications);
router.patch('/:notificationId', checkAuth(...Object.values(Role)), NotificationController.markAsRead);

export const NotificationRoutes = router;
