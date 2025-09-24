

import AppError from '../../errorHelpers/appError';


import httpStatus from 'http-status-codes';
import type { IReact } from './react.interface';
import { React} from './react.modal';
import { QueryBuilder } from '../../utils/QueryBuilder';


const createReact = async (payload: IReact) => {

 return await React.create(payload);



 
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
 
};
