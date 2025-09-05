import AppError from "../../errorHelpers/appError";
import type { IReactType } from "./react.interface";
import { ReactType } from "./react.modal";




const createReactType = async (payload: IReactType) => {
  const existingReactType = await ReactType.findOne({ type: payload.type });

  if (existingReactType) {
    throw new Error('React type already exists.');
  }

  return await ReactType.create(payload);

  
};
const getAllReactTypes = async () => {
  // const queryBuilder = new QueryBuilder(ReactType.find(), query);

  const ReactTypes = await ReactType.find()

  if (ReactTypes.length === 0) {
    throw new AppError(401, "NO REACT TYPE FOUND")
  }
  // const ReactTypes = await queryBuilder
  //   .search(ReactTypeSearchableFields)
  //   .filter()
  //   .sort()
  //   .fields()
  //   .paginate();

  // const [data, meta] = await Promise.all([
  //   ReactTypes.build(),
  //   queryBuilder.getMeta(),
  // ]);

  return {
    ReactTypes
  
  };
};
const getSingleReactType = async (id: string) => {
  const ReactTypes = await ReactType.findById(id);
  return {
    data: ReactTypes,
  };
};
const updateReactType = async (id: string, payload: IReactType) => {
  const existingReactType = await ReactType.findById(id);
  if (!existingReactType) {
    throw new Error('React type not found.');
  }
  const updatedReactType = await ReactType.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedReactType;
};
const deleteReactType = async (id: string) => {
  const existingReactType = await ReactType.findById(id);
  if (!existingReactType) {
    throw new Error('React type not found.');
  }

  return await ReactType.findByIdAndDelete(id);
};

export const ReactService = {

  createReactType,
  deleteReactType,
  updateReactType,
  getAllReactTypes,
  getSingleReactType,

};
