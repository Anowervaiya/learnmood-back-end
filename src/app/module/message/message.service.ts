import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHelpers/appError";
import type { IMedia } from "../../interfaces/global.interfaces";
import { QueryBuilder } from "../../utils/QueryBuilder";
import type { IMessages } from "./message.interface";
import { Message } from "./message.model";
import httpStatus from 'http-status-codes';

const sendMessage = async (payload: IMessages) => {
  return await Message.create(payload);
};


const getAllMessages = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Message.find(), query);

  const MessageData = queryBuilder
    // .search(MessageSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    MessageData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const updateMessage = async (id: string, payload: Partial<IMessages>) => {
  const isMessageExist = await Message.findById({_id: id});

  if (!isMessageExist) {
    throw new Error('Message does not exist.');
  }

  const updatedMessage = await Message.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (payload.media && isMessageExist.media) {
      await Promise.all(
        isMessageExist.media.map((media: IMedia) => deleteImageFromCLoudinary(media.url))
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
  sendMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
};

