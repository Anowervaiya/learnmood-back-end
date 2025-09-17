import {  Types } from 'mongoose';
import type { EntityType } from '../../constant/constant';

export interface IReview {
  user: Types.ObjectId;
  entityId: Types.ObjectId;
  entityType: EntityType;
  rating: number; 
  message?: string; 
}
