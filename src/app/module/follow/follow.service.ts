import { Page } from "../page/page.model";
import type { FOLLOWER_TYPE } from "./follow.constant";
import { Follow } from "./follow.model";

interface FollowProps {
  followerId: string;
  followerType: FOLLOWER_TYPE;
  followingId: string;
}

 const followPage = async (payload: FollowProps) => {
   const follow = await Follow.create({
     follower: { id: payload.followerId, type: payload.followerType },
     following: { id: payload.followingId, type: 'Page' },
   });

   await Page.findByIdAndUpdate(payload.followerId, { $inc: { followingsCount: 1 } });
   await Page.findByIdAndUpdate(payload.followingId, { $inc: { followersCount: 1 } });

   return follow;
 };

const unfollowPage = async (
  payload: FollowProps
) => {
  await Follow.findOneAndDelete({
    'follower.id': payload.followerId,
    'follower.type': payload.followerType,
    'following.id': payload.followingId,
  })

 
  await Page.findByIdAndUpdate(payload.followerId, { $inc: { followingsCount: -1 } });
 
  await Page.findByIdAndUpdate(payload.followingId, { $inc: { followersCount: -1 } })
}

const getFollowers = async (pageId: string) => {
  const followers = await Follow.find({
    "following.id": pageId,
    "following.type": "Page",
  }).populate("follower.id", "name image");

  return followers.map(f => f.follower.id);
};



 const getFollowings = async (id: string, type: FOLLOWER_TYPE) => {
  const followings= await Follow.find({
    'follower.id': id,
    'follower.type': type,
  }).populate('following.id', 'name image');
  return followings.map(f => f.following.id);
  }
   
   

export const FollowService = {
  followPage,
  unfollowPage,
  getFollowers,
  getFollowings,
}