import type { Types } from 'mongoose';
import type { CHALLENGE_CATEGORY, CHALLENGE_STATUS } from './challenge.contant';
import type { IMedia } from '../../interfaces/global.interfaces';
import type { EntityType } from '../../constant/constant';



export interface IChallengeVideo {
  fileName: string;
  fileType: string;
  key: string;
  uploadUrl: string;
}

export interface IQuize {
  question: string;
  options: string[];
  correctAnswer: string;
}
export interface IArticle {
  image: string;
  content: string;
}

export interface IChallengeDay {
  challengeId: Types.ObjectId;
  dayNumber: number;
  title: string;
  notes?: string[];
  video?: IChallengeVideo[];
  article?: string;
  // quiz?: IQuize[];
}
// Challenge interface
export interface IChallenge {
  title: string;
  description?: string;
  category: CHALLENGE_CATEGORY;
  durationDays: number;
  createdBy: Types.ObjectId;
  startsAt: Date;
  endsAt?: Date;
  ratings: number;
  isPublic: boolean;
  status: CHALLENGE_STATUS;
  banner?: string;
}

