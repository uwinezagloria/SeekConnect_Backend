import express from "express"
import {
  contactUsValidation,
  forgotPasswordValidation,
  foundDocumentValidation,
  loginValidation,
  lostDocumentValidation,
  signUpValidation
  //   searchValidation,
} from "../middlewares/validations.js";
import { signUp, verifyOtp, login, resertNewPassword, getAllUser, getUserByRole, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js"
import { createLostDocument, deleteLostDocument, getLostDocuments, updateLostDocument } from "../controllers/lostDocumentController.js"
import { getMissingPeople, getMissingperson, postMissingPerson, removeMissingPerson, updateMissingPerson } from "../controllers/missingPersonController.js"
import { createContactUs, deleteContactUs, getContact, getContactUs, updateContactUs } from "../controllers/contactUs.controller.js"
import { searchDocumentsAndPersons } from "../controllers/search.controller.js";
import { filterByCategory } from '../controllers/filter.controller.js';
import upload from "../middlewares/multer.js";
import { deleteFoundDocument, getAllFoundDocument, getFoundDocument, postFoundDocument, updateFoundDocument } from "../controllers/foundDocument.controller.js";
import { PostFoundMissingPerson, deleteFoundMissingPerson, getAllFoundMissingPeople, getFoundMissingPerson, updateFoundMissingPerson } from "../controllers/foundMissingPerson.controller.js";
import validateToken from "../middlewares/validateTokenHandler.js";
import onlyAdmin from "../middlewares/checkAdmin.js";
import { notification } from "../controllers/notification.controller.js";
const router = express.Router()
//signUp && signIn route
router.route("/signUp").post(signUpValidation, signUp)
router.route("/otp-verify").post(verifyOtp)
router.route("/login").post(loginValidation, login);
router.route("/resetPassword").post(forgotPasswordValidation, resertNewPassword)
//users
router.route("/users").get( getAllUser)
router.route("/users/role").get( getUserByRole)
router.route("/user").get( getUserById)
router.route("/users").patch(updateUser)
router.route("/user").delete( deleteUser)
//LostDocument route
router.route("/lost").post( lostDocumentValidation, createLostDocument)
router.route("/lost").get( getLostDocuments)
router.route("/lost").patch(updateLostDocument)
router.route("/lost").delete( deleteLostDocument)
//MissingPerson route,
router.route("/missingPerson").post(upload.single('file'), postMissingPerson)
router.route("/missingPerson").patch(upload.single('file'), updateMissingPerson)
router.route("/missingPeople").get(getMissingPeople)
router.route("/missingPerson").get( getMissingperson)
router.route("/missingPerson").delete( removeMissingPerson)
//contact us route
router.route("/contactUs").post(contactUsValidation, createContactUs)
router.route("/contactUs").get( getContactUs)
router.route("/contactUs/email").get( getContact)
router.route("/contactUs").patch(updateContactUs)
router.route("/contactUs").delete(deleteContactUs)
// Search route
router.route("/search").post(searchDocumentsAndPersons);
// Filter route
router.route('/filter').get( filterByCategory);
//Found Document route
router.route("/foundDocument").post(upload.single('file'), foundDocumentValidation, postFoundDocument)
router.route("/foundDocument").patch(upload.single('file'), updateFoundDocument)
router.route("/foundDocuments").get(getAllFoundDocument)
router.route("/foundDocument").get(getFoundDocument)
router.route("/foundDocument").delete(deleteFoundDocument)
//Found Missing Person route
router.route("/foundMissingPerson").post(upload.single('file'), PostFoundMissingPerson)
router.route("/foundMissingPerson").patch( upload.single('file'), updateFoundMissingPerson)
router.route("/foundMissingPerson").get(getFoundMissingPerson)
router.route("/foundMissingPerson").delete(deleteFoundMissingPerson)
router.route("/foundMissingPeople").get(getAllFoundMissingPeople)
//notification
router.route("/notification").get(notification)
export default router 