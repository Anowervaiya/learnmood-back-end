
import express from 'express'
import { MessageController } from './message.controller';
const router = express.Router()

router.post('/send/:id', MessageController.sendMessage);
router.get('/:id', MessageController.getAllMessages);
// router.get('/users', getSidebarUsers)
router.patch('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);



export const MessageRoutes = router;
