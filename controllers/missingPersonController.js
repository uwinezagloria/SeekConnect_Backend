//missing person  controller
import asyncWrapper from "../middlewares/async.js";
import missingPersonModel from "../models/missingPerson.models.js";
import customError from "../middlewares/customError.js"
import { validationResult } from "express-validator";
import userModel from "../models/user.models.js";
import cloudinary from "../utils/cloudinary.js";
//POST A MISSING PERSON
export const postMissingPerson = asyncWrapper(async (req, res, next) => {
try{

    //validate
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new customError("Bad Request", 403))
        console.log(error)
    }
    //check if userId provided is for the user in database
    const user = await userModel.findById({ _id: req.body.userId })
    if (!user) {
        return next(new customError(" No user with id ${req.body.id}", 404))
    }
    //create post for missing person
    const result = await cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            console.log(err.message)
            return res.status(500).json({ message: "error" })
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
            asset_id: result.asset_id
        },
        LostDate: req.body.LostDate,
        LostPlace: {
            Country: req.body['LostPlace.Country'],
            District: req.body['LostPlace.District'],
            Sector: req.body['LostPlace.Sector'],
            Cell: req.body['LostPlace.Cell'],
            Village: req.body['LostPlace.Village']
        },
        Comment: req.body.Comment,
        Found: req.body.Found
    });
    //save post to database
    const saveUser = await newPerson.save()
    if (!saveUser) {
        return next(new customError("something went wrong!please try again", 500))
    }
    res.status(201).json({
        message: "missing person posted successfully",
        person: saveUser
    })
}
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
    const missingPerson = await missingPersonModel.findById({ _id: req.query.id })
    if (!missingPerson) {
        return next(new customError("user not found", 404))
    }
    //check if one want to update a photo
    if (req.file) {
        const result = cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                return res.status(500).json({ message: "there is error in updating photo !try again" })
            }
        })
        missingPerson.Photo.public_id = result.public_id
        missingPerson.Photo.url = result.url
        missingPerson.Photo.asset_id = result.asset_id
    }
    //check if one want to update lostPlace
    if (req.body['LostPlace.Country']) {
        missingPerson.LostPlace.Country = req.body['LostPlace.Country']
    }
    if (req.body['LostPlace.Province']) {
        missingPerson.LostPlace.Province = req.body['LostPlace.Province']
    }
    if (req.body['LostPlace.District']) {
        missingPerson.LostPlace.District = req.body['LostPlace.District']
    }
    if (req.body['LostPlace.Sector']) {
        missingPerson.LostPlace.Sector = req.body['LostPlace.Sector']
    }
    if (req.body['LostPlace.Cell']) {
        missingPerson.LostPlace.Cell = req.body['LostPlace.Cell']
    }
    if (req.body['LostPlace.Village']) {
        missingPerson.LostPlace.Village = req.body['LostPlace.Village']
    }

    //when there is other field to update
    const update = await missingPersonModel.findByIdAndUpdate({ _id: req.query.id }, req.body, { new: true })
    if (!update) {
        return next(customError("user not found", 404))
    }
    await missingPerson.save()
    res.status(200).json({
        message: "updating missingperson",
        updatedData: update
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
//get a missing Person
export const getMissingperson = asyncWrapper(async (req, res, next) => {
    const getOne = await missingPersonModel.findById({ _id: req.query.id })
    res.status(200).json({
        message: "missing person",
        missedOne: getOne
    })
})