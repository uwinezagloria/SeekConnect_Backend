//missing person  controller
import asyncWrapper from "../middlewares/async.js";
import missingPersonModel from "../models/missingPerson.models.js";
import customError from "../middlewares/customError.js"
import { validationResult } from "express-validator";
import cloudinary from "../utils/cloudinary.js";
//POST A MISSING PERSON
export const postMissingPerson = asyncWrapper(async (req, res, next) => {
    
    
try{
    //create post for missing person
    const result = await cloudinary.uploader.upload(req.file.path,function(err,result) {
        if(err){
            console.log(err.message)
            return res.status(500).json({message:"error"})
        }
    })
    const newPerson = new missingPersonModel({
        UserId: req.body.UserId,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Race: req.body.Race,
        CountryOfOrigin: req.body.CountryOfOrigin,
        Age: req.body.Age,
        Photo: {
            public_id: result.public_id,
            url: result.secure_url,
            asset_id:result.asset_id
        },
        LostDate: req.body.LostDate,
        LostPlace:{
            Country: req.body.Country,
            District: req.body.District,
            Sector: req.body.Sector,
            Cell: req.body.Cell,
            Village: req.body.Village,
            comment: req.body.Comment,
            Found: req.body.Found,
        }
    });
    //save post to database
    const saveUser = await newPerson.save()
    if (!saveUser) {
        return next(new customError("something went wrong!please try again", 500))
    }
    res.status(201).json({
        message: "missing person posted successfully",
        person: saveUser
    })}
    catch(error){
        console.log(error.message)
    }
})

// get all missing people
export const getMissingPeople = asyncWrapper(async (req, res, next) => {
    const getAll = await missingPersonModel.find()
    res.status(200).json({
        message: "All missed people",
        people: getAll
    })
})
//update missing people
export const updateMissingPerson = asyncWrapper(async (req, res, next) => {
    const update = await missingPersonModel.findByIdAndUpdate(req.query.id, req.body, { new: true })
    if (!update) {
        return next(new customError("Not found", 404))
    }
    res.status(200).json({
        message: "missing person updated successfully",
        updated: update
    })
})
//delete missing person
export const removeMissingPerson = asyncWrapper(async (req, res, next) => {
    const deletePerson = await missingPersonModel.findByIdAndDelete(req.query.id)
    if (!deletePerson) {
        return next(new customError("Not Found", 404))
    }
    res.status(200).json({
        message: "missing person removed successfully"
    })
})