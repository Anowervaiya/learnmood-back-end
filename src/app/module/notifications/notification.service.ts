// controllers/notification.controller.ts
import type { Request, Response } from 'express';
import { Notification } from './notifications.model';

// 📌 Get all notifications of a user
 const getNotifications = async (userId : string) => {
    const notifications = await Notification.find({ receiver: userId })
      .populate('sender', 'name image')
     .sort({ createdAt: -1 });
   
   
   return {data:notifications}


 
};

// 📌 Mark notification as read
 const markAsRead = async (notificationId:string) => {

 
   const markAsRead = await Notification.findByIdAndUpdate(notificationId, { read: true });
   return { data: markAsRead };
    
 
 };

export const NotificationService = { getNotifications , markAsRead };