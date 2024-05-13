import express from "express"
import { forgotPasswordValidation, loginValidation, lostDocumentValidation, signUpValidation } from "../middlewares/validations.js"
import { signUp, verifyOtp, login, resertNewPassword} from "../controllers/user.controller.js"
import { createLostDocument, deleteLostDocument, getLostDocuments, updateLostDocument } from "../controllers/lostDocumentController.js"
const router=express.Router()
//signUp && signIn route
router.route("/signUp").post(signUpValidation,signUp)
router.route("/otp-verify").post(verifyOtp)
router.route("/login").post(loginValidation,login);
router.route("/resetPassword").post(forgotPasswordValidation,resertNewPassword)
//LostDocument route
router.route("/lost").post(lostDocumentValidation,createLostDocument)
router.route("/lost").get(getLostDocuments)
router.route("/lost").get(updateLostDocument)
router.route("/lost").delete(deleteLostDocument)
export default router 