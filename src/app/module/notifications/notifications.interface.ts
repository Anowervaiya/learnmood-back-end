import type { Types } from "mongoose";
import type { Notification_entityType } from './notifications.constant';

export interface INotification {
  entityId: Types.ObjectId;
  entityType: Notification_entityType;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  read: boolean;
  createdAt?: Date;
}