import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/async.js";
import contactUsModel from "../models/contactUs.models.js";
import customError from "../middlewares/customError.js";

// contact us controller
export const createContactUs=asyncWrapper(async(req,res,next)=>{
    //validate
    const error=validationResult(req)
    if(!error.isEmpty()){
        return next(new customError(error.array()[0].msg,403))
    }
    const newContactUs=await contactUsModel.create(req.body)
    res.status(201).json({message:newContactUs})
})
//get All Contact Us
export const getContactUs=asyncWrapper(async(req,res,next)=>{
    const getAll=await contactUsModel.find()
    res.status(200).json({message:getAll})
})
//update Contact us
export const updateContactUs=asyncWrapper(async(req,res,next)=>{
    const update=await contactUsModel.findByIdAndUpdate({_id:req.query.id},req.body,{new:true})
    if(!update){
        return next(new customError("Not Found",404))
    }
    res.status(200).json({updated:update})
})
//delete a contact us
export const deleteContactUs=asyncWrapper(async(req,res,next)=>{
    const remove=await contactUsModel.findByIdAndDelete({_id:req.query.id})
    if(!remove){
        return next(new customError("Not Found",404))
    }
    res.status(200).json({updated:update})
})
//get contact us for one person
export const getContact=asyncWrapper(async(req,res,next)=>{
    const getContact=await contactUsModel.findOne({Email:req.query.email})
    if(!getContact){
        return next(new customError("Not Found",404))
    }
    res.status(200).json({contactUs:getContact})
})