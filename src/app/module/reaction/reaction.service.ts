

import AppError from '../../errorHelpers/appError';
import httpStatus from 'http-status-codes';
import type { IReact } from './reaction.interface';
import { React } from './reaction.modal';
import mongoose from 'mongoose';
import { Post } from '../post/post.model';
import type { ReactType } from './reaction.contant';



export const createReact = async (payload: IReact) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { user, entityId, entityType, reactType } = payload;

    // Check if user already reacted
    const existingReact = await React.findOne({ user, entityId, entityType }, null, { session });

    // Fetch post
    const post = await Post.findById(entityId).session(session);
    if (!post) throw new AppError(404, 'Post not found');

    // Initialize reactions object
    const reactions: Record<ReactType, number> = {
      like: 0,
      love: 0,
      haha: 0,
      sad: 0,
      angry: 0,
      ...(post.reactions || {}), // merge existing
    };

    let action: 'created' | 'removed' | 'updated';

    // 1️⃣ Remove if same type clicked → undo reaction
    if (existingReact && existingReact.reactType === reactType) {
      await React.findByIdAndDelete(existingReact._id, { session });

      reactions[reactType] = (reactions[reactType] || 0) - 1;

      action = 'removed';
    }
    // 2️⃣ Update if different reaction type
    else if (existingReact) {
      // decrement old type
      reactions[existingReact.reactType] = (reactions[existingReact.reactType] || 0) - 1;
      // increment new type
      reactions[reactType] = (reactions[reactType] || 0) + 1;

      // update react document
      await React.findByIdAndUpdate(existingReact._id, { reactType }, { session });

      action = 'updated';
    }
    // 3️⃣ Create new reaction
    else {
      await React.create([{ user, entityId, entityType, reactType }], { session });

      reactions[reactType] = (reactions[reactType] || 0) + 1;

      action = 'created';
    }

    // Save post with updated reactions
    post.reactions = reactions;
    await post.save({ session });

    await session.commitTransaction();
    session.endSession();


    return {
      success: true,
      action,
      reactions, // return updated reactions
    };

   
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};



const getAllReact= async (query: Record<string, string>) => {


  const data = await React.find(query)
  const meta = await React.countDocuments(query)
  // const queryBuilder = new QueryBuilder(React.find(), query);
  // const ReactData = queryBuilder
    // .search(ReactSearchableFields)
    // .filter()
    // .sort()
    // .fields()
    // .paginate();

  // const [data, meta] = await Promise.all([
  //   ReactData.build(),
  //   queryBuilder.getMeta(),
  // ]);

  return {
    data ,
    meta: {
      total: meta
    },
  };
};
const getMyReact= async (query: Record<string, string>) => {

  const { entityId, entityType, userId } = query;

    if (!entityId || !entityType || !userId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Missing parameters");
    }

    const userReact = await React.findOne({
      entityId,
      entityType,
      user: userId,
    });
    return userReact;

};

const updateReact = async (id: string, payload: Partial<IReact>) => {
  const isReactExist = await React.findById(id);
 

  if (!isReactExist) {
    throw new Error('React does not exist.');
  }

  const updatedReact = await React.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedReact;
};

const deleteReact = async (id: string) => {
  const isReactExist = await React.findById(id);
  if (!isReactExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "React doesn't exist");
  }

  return await React.findByIdAndDelete(id);
};

export const ReactServices = {
  createReact,
  updateReact,
  deleteReact,
  getAllReact,
  getMyReact,
};
