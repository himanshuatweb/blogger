import { Router } from "express";
import { uploadMedia } from "../controllers/upload.controller";
import protectedRoute from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { multerErrorHandler } from "../middlewares/multerErrorHandler.middleware";

const router = Router();

router.route('/single')
    .post(protectedRoute, upload.single('media'), multerErrorHandler, uploadMedia)

router.route('/multiple')
    .post(protectedRoute, upload.array('media', 5), multerErrorHandler, uploadMedia)

export default router;