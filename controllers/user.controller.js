import userModel from "../models/user.models.js";
import asyncWrapper from "../middlewares/async.js";
import { validationResult } from "express-validator";
import customError from "../middlewares/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "../utils/otp.js";
import { sendEmail } from "../utils/sendemail.js";
import lostDocumentModel from "../models/lostDocument.models.js";
import foundDocumentModel from "../models/foundDocuments.models.js";
import missingPersonModel from "../models/missingPerson.models.js";
import foundMissingPersonModel from "../models/foundMissingPerson.models.js";

//registration
export const signUp = asyncWrapper(async (req, res, next) => {

    try {
        //signUp validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new customError(errors.array()[0].msg, 403))
        }
        //check if user exist

        const userExist = await userModel.findOne({ Email: req.body.Email })
        if (userExist) {
            return next(new customError("user already exist", 403))
        }
        //compare password with confirm password
        if (req.body.Password !== req.body.ConfirmPassword) {
            return next(new customError("password do not match", 403))
        }

        //hash password
        const hashedPassword = await bcrypt.hash(req.body.Password, 10)
        //generation otp
        const otp = otpGenerator()
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP expires in 10 minutes
        //send verification code
        await sendEmail(req.body.Email, "Verification Code", `Your OTP is ${otp}`);
        //create user
        const user = new userModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: hashedPassword,
            otp: otp,
            otpExpiration: otpExpiration,
            role: req.body.role
        })
        //save user to database
        const saveUser = await user.save()
        if (!saveUser) {
            return res.status(500).json({ message: "something went wrong,please try again" })
        }
        res.status(201).json({ message: "user created successfully" })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur in login" })
    }
})

// Verify OTP 
export const verifyOtp = asyncWrapper(async (req, res, next) => {
    try {
        //getting user email and otp we send 
        const otp = req.body.otp
        //search user with that email and otp
        const foundUser = await userModel.findOne({ otp: otp })
        if (!foundUser) {
            return next(new customError("Authorization denied", 403))
        }
        //check if otp stored in database is equal to the one in request
        if (!foundUser.otp === otp) {
            return next(new customError("wrong otp", 403))
        }
        //check if otp is expired
        if (!foundUser.otpExpiration > new Date().getTime()) {
            return next(new customError("otp expired", 404))
        }
        //check if otp has not been verified
        if (foundUser.otpExpiration == false) {
            return next(new customError("already verified ", 403))
        }
        //verify otp turn to true
        foundUser.otpVerified = true
        //save change to database
        const saveUser = await foundUser.save()
        if (saveUser) {
            return res.status(201).json({
                message: "account verified",
                user: saveUser
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export const login = asyncWrapper(async (req, res, next) => {
    try {

        //validate
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return next(new customError(error.array()[0].msg, 401))
        }
        //check if user provide email and password
        const email = req.body.Email
        const password = req.body.Password
        if (!email || !password) {
            return next(new customError("invalid email or password", 401))
        }
        // Check if the user exists
        const user = await userModel.findOne({ Email: req.body.Email });
        if (!user) {
            return next(new customError("Invalid credentials", 404));
        }
        //check if user verify  otp
        if (user.otpVerified === false) {
            return next(new customError("verify your account", 401))
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(req.body.Password, user.Password);
        if (!isPasswordValid) {
            return next(new customError("Invalid credentials", 401));
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.status(200).json({
            message: "user login successfully",
             email: req.body.Email,
        role:user.role,
            token: token
        });
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur !try again" })
    }
});
//reseting new password when you forgot it
export const resertNewPassword = asyncWrapper(async (req, res, next) => {
    try {
        //validate
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return next(new customError("Bad Request", 403))
        }

        //get user with provided email
        const findUser = await userModel.find({ Email: req.body.Email })
        if (!findUser) {
            return next(new customError("user not found", 404))
        }
        //check if new password equal to confirm new password
        if (req.body.Password !== req.body.ConfirmPassword) {
            return next(new customError("Invalid password", 403))
        }
        //hash new password
        const hashedPassword = await bcrypt.hash(req.body.Password, 10)
        //change password stored in database to new password
        const update = await userModel.findOneAndUpdate({ Email: req.body.Email }, { Password: hashedPassword }, { new: true })
        if (!update) {
            return res.status(500).json({ message: "something went wrong,please try again!" })
        }

        res.status(200).json({ message: "Password resert successfully" })
        console.log(req.body.Password)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "an error occur!please try again" })
    }
})
//update user credentials
export const updateUser = asyncWrapper(async (req, res, next) => {
    try {
        const update = await userModel.findByIdAndUpdate({_id:req.query.id}  , req.body, { new: true })
        if (!update) {
            return next(new customError("user not found", 404))
        }
        res.status(200).json({
            message: "update user information",
            updated: update
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "an error occur!please try again" })
    }
})
//get all users
export const getAllUser = asyncWrapper(async (req, res, next) => {
    try {
        const getAll = await userModel.find()
        res.status(200).json({
            message: "all user of seekconect",
            users: getAll
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur!try again" })
    }
})
//get user by role
export const getUserByRole = asyncWrapper(async (req, res, next) => {
    try {
        const getUser = await userModel.findOne({ role: req.query.role })
        if (!getUser) {
            return next(new customError(`No users with role ${req.query.role}`, 404))
        }
        res.status(200).json({
            message: "get user their role",
            users: getUser
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur!try again" })
    }
})
//get user by his/her id
export const getUserById = asyncWrapper(async (req, res, next) => {
    try {
        const getUser = await userModel.findOne({ _id: req.query.id })
        if (!getUser) {
            return next(new customError(`No users with id ${req.query.id}`, 404))
        }
        res.status(200).json({
            message: "get user by id",
            users: getUser
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur!try again" })
    }
})
//delete user
export const deleteUser = asyncWrapper(async (req, res, next) => {
    try {
        const removeUser = await userModel.findByIdAndDelete({ _id: req.query.id })
        if (!removeUser) {
            return next(new customError(`No users with id ${req.query.id}`, 404))
        }
        //delete all things create by this user
        //1.delete lostdocument if user has created it
        const lostDocument = await lostDocumentModel.findOne({ UserId: req.query.id })
        const foundDocument = await foundDocumentModel.findOne({ UserId:req.query.id })
        const missingPerson = await missingPersonModel.findOne({ UserId:req.quey.id })
        const foundMissingPerson = await foundMissingPersonModel.findOne({ UserId:req.query.id })
        if (lostDocument) {
            await lostDocument.findByIdAndDelete({ _id: lostDocument._id })
        }
        if (foundDocument) {
            await foundDocument.findByIdAndDelete({ _id: foundDocument._id })
        }
        if (missingPerson) {
            await missingPerson.findByIdAndDelete({ _id: missingPerson._id })
        }
        if (foundMissingPerson) {
            await foundMissingPerson.findByIdAndDelete({ _id:foundMissingPerson._id })
        }
        res.status(200).json({
            message: "user account deleted successfully"
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur!try again" })
    }
})