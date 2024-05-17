import {body} from "express-validator"
//validate signUp
export const signUpValidation=[
    body("FirstName","First name is required").not().isEmpty(),
    body("LastName","Last name is required").not().isEmpty(),
    body("Email","Email is required").not().isEmpty(),
    body("Email","Invalid Email").isEmail(),
    body("Password","password is required").not().isEmpty(),
    body("Password"," provide strong password ").isStrongPassword(),
    body("ConfirmPassword"," retype password ").not().isEmpty(),
] ;
//validate login
export const loginValidation=[
    body("Email","Email is required").not().isEmpty(),
    body("Email","Invalid Email").isEmail(),
    body("Password","password is required").not().isEmpty()
]
//validate forgotPassword
export const forgotPasswordValidation=[
    body("Email","Email is required").not().isEmpty(), 
    body("Email","Invalid Email").isEmail(),
    body("Password","password is required").not().isEmpty(),
    body("Password"," provide strong password ").isStrongPassword(),
    body("ConfirmPassword"," retype password ").not().isEmpty()
]
//validate lostDocuments
export const lostDocumentValidation=[
    body("DocumentType","type of lost document is required").not().isEmpty(),
    body("NameOnDocument","name on lost document is required").not().isEmpty(),
    body("PlaceOfIssueOnDocument","placeo of issue for  lost document is required").not().isEmpty(),
    body("LostDate","date  is required").not().isEmpty(),
]
// //validate missingPerson
// export const missingPersonValidation=[
//     body("FirstName","First name is required").not().isEmpty(),
//     body("LastName","Last name is required").not().isEmpty(),
//     body("Race","race  is required").not().isEmpty(),
//     body("CountryOfOrigin","Country Of Origin is required").not().isEmpty(),
//     body("LostDate","LostDate  is required").not().isEmpty(),
    
// ]
//Validate found lost document
export const foundDocumentValidation=[
body("DocumentType","type of lost document is required").not().isEmpty(),
body("NameOnDocument","name on lost document is required").not().isEmpty(),
body("PlaceOfIssueOnDocument","placeo of issue for  lost document is required").not().isEmpty(),
body("FoundDate"," found date  is required").not().isEmpty(),
body("FoundPlace","place  is required").not().isEmpty(),
]
//validate found missing person
export const foundMissingPersonValidation=[
     body("FirstName","First name is required").not().isEmpty(),
    body("LastName","Last name is required").not().isEmpty(),
    body("Race","race  is required").not().isEmpty(),
    body("CountryOfOrigin","Country Of Origin is required").not().isEmpty(),
    body("Photo","photo  is required").not().isEmpty(),
    body("FoundDate","Found Date  is required").not().isEmpty(),
    body("FoundPlace","Place  is required").not().isEmpty(),
]
// validate contactUs
export const contactUsValidation=[
    body("Name","name is required").not().isEmpty(),
    body("Email","Email is required").not().isEmpty(),
    body("Email","Email is invalid").isEmail(),
    body("Message","message is required").not().isEmpty(), 
]