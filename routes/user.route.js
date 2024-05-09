import express from "express"
import { signUpValidation } from "../middlewares/validations.js"
import { signUp, verifyOtp } from "../controllers/user.controller.js"
const router=express.Router()
//signUp route
router.route("/signUp").post(signUpValidation,signUp)
router.route("/otp-verify").post(verifyOtp)

export default router 