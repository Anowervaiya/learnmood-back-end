
import httpStatus from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import type { Request, Response } from 'express';
import { FollowService } from './follow.service';
import { sendResponse } from '../../utils/sendResponse';
import type { FOLLOWER_TYPE } from './follow.constant';
import type { JwtPayload } from 'jsonwebtoken';

// ✅ Follow a Page
 const followPage = catchAsync(async (req: Request, res: Response) => {
   const decodeToken = req.user as JwtPayload
  const { followerType, followingId } = req.body;
   const payload = { followerId : decodeToken?.accountId, followerType, followingId };

   const result = await FollowService.followPage(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Followed successfully',
    data: result,
  });
});

// ✅ Unfollow a Page
 const unfollowPage = catchAsync(async (req: Request, res: Response) => {
   const decodeToken = req.user as JwtPayload
  const { followerType, followingId } = req.body;
   const payload = { followerId : decodeToken?.accountId, followerType, followingId };

  await FollowService.unfollowPage(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unfollowed successfully',
    data: null,
  });
});

// ✅ Get all followers of a Page
 const getFollowers = catchAsync(async (req: Request, res: Response) => {
  const { pageId } = req.params;
  const result = await FollowService.getFollowers(pageId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followers fetched successfully',
    data: result,
  });
});

// ✅ Get all followings of a User or Page
 const getFollowings = catchAsync(async (req: Request, res: Response) => {
  const { id, type } = req.params as { id: string; type: FOLLOWER_TYPE };
  const result = await FollowService.getFollowings(id, type);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followings fetched successfully',
    data: result,
  });
 });

 
// ✅ Get all follow status
 const getFollowStatus  = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user as JwtPayload
  const followingId  = req?.query?.followingId as string
  const payload = {
    followerId: decodedToken?.accountId,
    followingId: followingId
  }

  const result = await FollowService.getFollowStatus(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow Status fetched successfully',
    data: result,
  });
 });


export const FollowController = {
  followPage,
  unfollowPage,   
  getFollowers,
  getFollowings,
  getFollowStatus 
};  