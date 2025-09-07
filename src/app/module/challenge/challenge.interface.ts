import type { Types } from 'mongoose';
import type { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from './challenge.contant';
import type { IMedia } from '../../interfaces/global.interfaces';

export interface IParticipant {
  user: Types.ObjectId;
  joinedAt?: Date;
  progress?: number; // % completion or streak count
  completed?: boolean;
}

// Challenge interface
export interface IChallenge  {
  title: string;
  description?: string;
  category: CHALLENGE_CATEGORY;
  durationDays: number;
  createdBy: Types.ObjectId;
  participants: IParticipant[];
  startsAt: Date;
  endsAt?: Date;
  rewardPoints: number;
  badges: string[];
  ratings: number;
  isPublic: boolean;
  status: CHALLENGE_STATUS;
  media?: IMedia[];
}

