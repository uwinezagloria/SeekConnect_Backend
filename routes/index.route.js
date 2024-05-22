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
const router = express.Router()
//signUp && signIn route
router.route("/signUp").post(signUpValidation, signUp)
router.route("/otp-verify").post(verifyOtp)
router.route("/login").post(loginValidation, login);
router.route("/resetPassword").post(forgotPasswordValidation, resertNewPassword)
//users
router.route("/users").get(validateToken, onlyAdmin, getAllUser)
router.route("/users/role").get(validateToken, onlyAdmin, getUserByRole)
router.route("/user").get(validateToken, onlyAdmin, getUserById)
router.route("users").patch(validateToken, updateUser)
router.route("/user").delete(validateToken, deleteUser)
//LostDocument route
router.route("/lost").post(validateToken, lostDocumentValidation, createLostDocument)
router.route("/lost").get(validateToken, getLostDocuments)
router.route("/lost").patch(validateToken, updateLostDocument)
router.route("/lost").delete(validateToken, deleteLostDocument)
//MissingPerson route,
router.route("/missingPerson").post(validateToken, upload.single('file'), postMissingPerson)
router.route("/missingPerson").patch(validateToken, upload.single('file'), updateMissingPerson)
router.route("/missingPeople").get(validateToken, getMissingPeople)
router.route("/missingPerson").get(validateToken, getMissingperson)
router.route("/missingPerson").delete(validateToken, removeMissingPerson)
//contact us route
router.route("/contactUs").post(contactUsValidation, createContactUs)
router.route("/contactUs").get(validateToken, onlyAdmin, getContactUs)
router.route("/contactUs/email").get(validateToken, onlyAdmin, getContact)
router.route("/contactUs").patch(updateContactUs)
router.route("/contactUs").delete(deleteContactUs)
// Search route
router.route("/search").post(validateToken, onlyAdmin, searchDocumentsAndPersons);
// Filter route
router.route('/filter').get(validateToken, onlyAdmin, filterByCategory);
//Found Document route
router.route("/foundDocument").post(validateToken, upload.single('file'), foundDocumentValidation, postFoundDocument)
router.route("/foundDocument").patch(validateToken, upload.single('file'), updateFoundDocument)
router.route("/foundDocuments").get(getAllFoundDocument)
router.route("/foundDocument").get(getFoundDocument)
router.route("/foundDocument").delete(validateToken, deleteFoundDocument)
//Found Missing Person route
router.route("/foundMissingPerson").post(validateToken, upload.single('file'), PostFoundMissingPerson)
router.route("/foundMissingPerson").patch(validateToken, upload.single('file'), updateFoundMissingPerson)
router.route("/foundMissingPerson").get(getFoundMissingPerson)
router.route("/foundMissingPerson").delete(validateToken, deleteFoundMissingPerson)
router.route("/foundMissingPeople").get(getAllFoundMissingPeople)
export default router 