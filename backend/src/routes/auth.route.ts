import { Router } from "express";
import { forgotPassword, logOut, refershAccessToken, resetPassword, userLogin, userRegister, verifyUser } from "../controllers/auth.controller";
import { upload } from "../middlewares/multer.middleware";
import { multerErrorHandler } from "../middlewares/multerErrorHandler.middleware";
import protectedRoute from "../middlewares/auth.middleware";

const router = Router();

router.route('/login')
    .post(userLogin)

router.route('/register')
    .post(upload.single('userImage'), multerErrorHandler, userRegister)

router.route('/verify')
    .post(verifyUser)
router.route('/forgot-password')
    .post(forgotPassword)

router.route('/resetpassword/:resettoken')
    .put(resetPassword);

router.route('/logout')
    .get(protectedRoute, logOut)

router.route('/refreshTokens')
    .post(refershAccessToken)


export default router;