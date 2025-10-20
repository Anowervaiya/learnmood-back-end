import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import AppError from '../../errorHelpers/appError';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});


const getUploadUrl = catchAsync(async (req: Request, res: Response) => {

  const { fileName, fileType } = req.body as { fileName: string, fileType: string }

  if (!fileName || !fileType) {
    throw new AppError(400,'fileName & fileType is required')
  }
  
  const key = `videos/${uuidv4()}-${fileName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })

 

  const result = { uploadUrl, key, fileName, fileType };
  

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'signurl is created successfully',
    data: result,
  });
});

const getVideoPreviewUrl = catchAsync(async (req: Request, res: Response) => {
  const { key } = req.params;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key:`videos/${key}`
  });

  const url = await getSignedUrl(s3, command)

 
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Video url retrieved successfully',
    data: url
  });
});
const getAllVideoKey = catchAsync(async (req: Request, res: Response) => {
  
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix:"videos/"
  });
  const result = await s3.send(command);
  const videosKeys = result.Contents?.map((obj) => ({ key: obj.Key })) || [];

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Videos Keys retrieved successfully',
    data: videosKeys,
  });
});

export const VideoController = {
  getUploadUrl,
  getVideoPreviewUrl,
  getAllVideoKey,
};
