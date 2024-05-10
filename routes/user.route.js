import express from "express"
import { forgotPasswordValidation, loginValidation, signUpValidation } from "../middlewares/validations.js"
import { signUp, verifyOtp, login, resertNewPassword} from "../controllers/user.controller.js"
const router=express.Router()
//signUp route
router.route("/signUp").post(signUpValidation,signUp)
router.route("/otp-verify").post(verifyOtp)
router.route("/login").post(loginValidation,login);
router.route("/resetPassword").post(forgotPasswordValidation,resertNewPassword)
export default router 