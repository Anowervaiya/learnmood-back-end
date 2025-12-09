import AppError from "../../errorHelpers/appError";
import { Page } from "../page/page.model";
import { FOLLOWER_TYPE } from "./follow.constant";
import { Follow } from "./follow.model";

interface FollowProps {
  followerId: string;
  followerType: FOLLOWER_TYPE;
  followingId: string;
}



// ================================
// FOLLOW PAGE
// ================================
 const followPage = async (payload: FollowProps) => {
  const isFollowExist = await Follow.findOne({
    "follower.id": payload.followerId,
    "follower.type": payload.followerType,
    "following.id": payload.followingId,
    "following.type": FOLLOWER_TYPE.Page
  });

  if (isFollowExist) {
    throw new AppError(401, "You have already followed this page");
  }

  const follow = await Follow.create({
    follower: {
      id: payload.followerId,
      type: payload.followerType,
    },
    following: {
      id: payload.followingId,
      type: FOLLOWER_TYPE.Page,
    },
  });

  await Page.findByIdAndUpdate(payload.followerId, {
    $inc: { followingsCount: 1 },
  });

  await Page.findByIdAndUpdate(payload.followingId, {
    $inc: { followersCount: 1 },
  });

  return follow;
};

// ================================
// UNFOLLOW PAGE
// ================================
 const unfollowPage = async (payload: FollowProps) => {
  const deleted = await Follow.findOneAndDelete({
    "follower.id": payload.followerId,
    "follower.type": payload.followerType,
    "following.id": payload.followingId,
    "following.type": FOLLOWER_TYPE.Page,
  });

  if (!deleted) {
    throw new AppError(404, "You are not following this page");
  }

  await Page.findByIdAndUpdate(payload.followerId, {
    $inc: { followingsCount: -1 },
  });

  await Page.findByIdAndUpdate(payload.followingId, {
    $inc: { followersCount: -1 },
  });

  return true;
};

// ================================
// GET FOLLOWERS OF A PAGE
// ================================
 const getFollowers = async (pageId: string) => {
  const followers = await Follow.find({
    "following.id": pageId,
    "following.type": FOLLOWER_TYPE.Page,
  }).populate("follower.id", "name image");

  return followers.map((f) => f.follower.id);
};

// ================================
// GET FOLLOWINGS OF ANY USER/PAGE
// ================================
 const getFollowings = async (id: string, type: FOLLOWER_TYPE) => {
  const followings = await Follow.find({
    "follower.id": id,
    "follower.type": type,
  }).populate("following.id", "name image");

  return followings.map((f) => f.following.id);
};

// ================================
// GET FOLLOWINGS OF ANY USER/PAGE
// ================================
 const getFollowStatus  = async (payload:  {followerId: string, followingId: string}) => {

  const exists = await Follow.findOne({
    "follower.id": payload.followerId,
    "following.id": payload.followingId
  });

  return  { isFollowing: !!exists }
};


export const FollowService = {
  followPage,
  unfollowPage,
  getFollowers,
  getFollowings,
  getFollowStatus 
}