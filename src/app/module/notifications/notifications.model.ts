// models/notification.model.ts
import mongoose from 'mongoose';
import { Notification_entityType } from './notifications.constant';
import type { INotification } from './notifications.interface';

const NotificationSchema = new mongoose.Schema<INotification>(
  {
    entityId: { type: mongoose.Schema.Types.ObjectId },
    entityType: {
      type: String,
      enum: Object.values(Notification_entityType),
      required: true,
    }, // "message", "like", ...
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // who caused it
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export  const Notification= mongoose.model('Notification', NotificationSchema);
