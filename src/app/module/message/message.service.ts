import type { JwtPayload } from 'jsonwebtoken';
import { deleteImageFromCLoudinary } from '../../config/cloudinary.config';
import AppError from '../../errorHelpers/appError';
import type { IMedia } from '../../interfaces/global.interfaces';
import { QueryBuilder } from '../../utils/QueryBuilder';
import type { IMessages, IPayloadGetMessage } from './message.interface';
import { Message } from './message.model';
import httpStatus from 'http-status-codes';
import { User } from '../user/user.model';
import { getSocketId, io } from '../../../socket';

const sendMessage = async (payload: IMessages) => {
  const newMessage = await Message.create(payload);
  const receiverSocketId = getSocketId(payload?.receiverId as unknown as string);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage

    );
  }
  return newMessage;
};

const getSidebarUsers = async (user: JwtPayload) => {
  const userId = user.userId as string;

  const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
    '-password'
  );

  return {
    data: filteredUsers
  };
};


const getMessages = async (payload: IPayloadGetMessage) => {


  const messages = await Message.find({
    $or: [
      { senderId: payload.userId, receiverId: payload.userToChatId },
      {senderId: payload.userToChatId, receiverId: payload.userId}
    ]
  })

  return {
    data: messages
  };
};


const updateMessage = async (id: string, payload: Partial<IMessages>) => {
  const isMessageExist = await Message.findById({ _id: id });

  if (!isMessageExist) {
    throw new Error('Message does not exist.');
  }

  const updatedMessage = await Message.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (payload.media && isMessageExist.media) {
    await Promise.all(
      isMessageExist.media.map((media: IMedia) =>
        deleteImageFromCLoudinary(media.url)
      )
    );
  }

  return updatedMessage;
};

const deleteMessage = async (id: string) => {
  const isMessageExist = await Message.findById(id);
  if (!isMessageExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Message doesn't exist");
  }

  return await Message.findByIdAndDelete(id);
};

export const MessageServices = {
  getSidebarUsers,
  sendMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
