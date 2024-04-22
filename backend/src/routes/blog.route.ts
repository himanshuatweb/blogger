import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { multerErrorHandler } from "../middlewares/multerErrorHandler.middleware";
import protectedRoute from "../middlewares/auth.middleware";
import { createBlog, dislikeBlog, likeBlog } from "../controllers/blog.controller";



const router = Router();

router.route('/')
    .post(protectedRoute, createBlog)

router.route('/:id/like')
    .post(protectedRoute, likeBlog)

router.route('/:id/dislike')
    .post(protectedRoute, dislikeBlog)


export default router;