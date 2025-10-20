import { Router } from "express";
import { VideoController } from "./video.controller";

const router = Router()

router.post('/get-upload-url', VideoController.getUploadUrl);
router.get('/all-video-key', VideoController.getAllVideoKey); 
router.get('/get-preview-url/:key', VideoController.getVideoPreviewUrl); 

export const VideoRoutes = router;