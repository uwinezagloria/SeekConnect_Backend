import userModel from "../models/user.models.js";
import asyncWrapper from "../middlewares/async.js";
import { validationResult } from "express-validator";
import customError from "../middlewares/customError.js";
import bcrypt from "bcrypt"
import otpGenerator from "../utils/otp.js";
import { sendEmail

 } from "../utils/sendemail.js";
//registration
export const signUp=asyncWrapper(async(req,res,next)=>{
    

        //signUp validation
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return next(new customError(errors.array()[0].msg,403))
        }
        //check if user exist
    
        const userExist=await userModel.findOne({Email:req.body.Email})
        if(userExist){
            return next(new customError("user already exist",403))
        }
        //compare password with confirm password
        if(req.body.Password !== req.body.ConfirmPassword){
            return next(new customError("password do not match",403))
        }
        
        //hash password
        const hashedPassword=await bcrypt.hash(req.body.Password,10)
        //generation otp
        const otp=otpGenerator()
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP expires in 10 minutes
//send verification code
        await sendEmail(req.body.Email, "Verification Code", `Your OTP is ${otp}`);
        //create user
const user=new userModel({
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    Email:req.body.Email,
    Password:hashedPassword,
    otp:otp,
    otpExpiration:otpExpiration
})
//save user to database
const saveUser=await user.save()
if(saveUser){
    return res.status(201).json({message:"user created successfully"})
}
})

// Verify OTP 
export const verifyOtp=asyncWrapper(async(req,res,next)=>{
    try{
    //getting user email and otp we send 
    const otp=req.body.otp
    //search user with that email and otp
    const foundUser=await userModel.findOne({otp:otp})
    if(!foundUser){
        return next(new customError("Authorization denied",403))
    }
    //check if otp stored in database is equal to the one in request
    if(!foundUser.otp===otp){
        return next(new customError("wrong otp",403))
    }
    //check if otp is expired
     if(  !foundUser.otpExpiration>new Date().getTime()){
return next(new customError("otp expired",404))
    }
    //check if otp has not been verified
    if(foundUser.otpExpiration==false){
        return next(new customError("already verified ",403)) 
    }
    //verify otp turn to true
    foundUser.otpVerified=true
    //save change to database
    const saveUser=await foundUser.save()
    if(saveUser){
        return res.status(201).json({
            message:"account verified",
            user:saveUser
        })
    }
} catch(error){
    res.status(500).json({message:error.message})
}
})
//login controller
