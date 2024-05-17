import express from "express"
import multer from "multer"
import { contactUsValidation, forgotPasswordValidation, loginValidation, lostDocumentValidation,signUpValidation } from "../middlewares/validations.js"
import { signUp, verifyOtp, login, resertNewPassword} from "../controllers/user.controller.js"
import { createLostDocument, deleteLostDocument, getLostDocuments, updateLostDocument } from "../controllers/lostDocumentController.js"
import { getMissingPeople, postMissingPerson, removeMissingPerson, updateMissingPerson } from "../controllers/missingPersonController.js"
import { createContactUs, deleteContactUs, getContact, getContactUs, updateContactUs } from "../controllers/contactUs.controller.js"
import upload from "../middlewares/multer.js"
const router=express.Router()
//signUp && signIn route
router.route("/signUp").post(signUpValidation,signUp)
router.route("/otp-verify").post(verifyOtp)
router.route("/login").post(loginValidation,login);
router.route("/resetPassword").post(forgotPasswordValidation,resertNewPassword)
//LostDocument route
router.route("/lost").post(lostDocumentValidation,createLostDocument)
router.route("/lost").get(getLostDocuments)
router.route("/lost").patch(updateLostDocument)
router.route("/lost").delete(deleteLostDocument)
//MissingPerson route
router.route("/missingPerson").post(upload.single('file'), postMissingPerson)
router.route("/missingPerson").patch(updateMissingPerson)
router.route("/missingPeople").get(getMissingPeople)
router.route("/missingPerson").delete(removeMissingPerson)
//contact us route
router.route("/contactUs").post(contactUsValidation,createContactUs)
router.route("/contactUs").get(getContactUs)
router.route("/contactUs/email").get(getContact)
router.route("/contactUs").patch(updateContactUs)
router.route("/contactUs").delete(deleteContactUs)
export default router 