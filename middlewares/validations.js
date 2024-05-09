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
] 