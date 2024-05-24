//found missing person controller
import userModel from "../models/user.models.js";
import asyncWrapper from "../middlewares/async.js";
import customError from "../middlewares/customError.js";
import foundMissingPersonModel from "../models/foundMissingPerson.models.js";
import cloudinary from "../utils/cloudinary.js";
export const PostFoundMissingPerson = asyncWrapper(async (req, res, next) => {
    try {
        //check if userId provided is for the user in database
        const user = await userModel.findById({ _id: req.body.userId })
        if (!user) {
            return next(new customError(" No user with id ${req.body.id}", 404))
        }
        //create post for  found missing person
        const result = await cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err.message)
                return res.status(500).json({ message: "error" })
            }
        })
        const newFound = new foundMissingPersonModel({
            UserId: req.body.UserId,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Race: req.body.Race,
            CountryOfOrigin: req.body.CountryOfOrigin,
            Age: req.body.Age,
            Photo: {
                public_id: result.public_id,
                asset_id: result.asset_id,
                url: result.secure_url
            },
            FoundDate: req.body.FoundDate,
            FoundPlace: {
                Country: req.body['FoundPlace.Country'],
                District: req.body['FoundPlace.District'],
                Sector: req.body['FoundPlace.Sector'],
                Cell: req.body['FoundPlace.Cell'],
                Village: req.body['FoundPlace.Village']
            },
            Comment: req.body.Comment,
            returnedToOwner: req.body.returnedToOwner
        })
        //save record to database
        const savePerson = await newFound.save()
        if (!savePerson) {
            return next(new customError("error occur in saving person,try again", 500))
        }
        res.status(200).json({
            message: "posted found Missing Person successfully",
            Person: savePerson
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "an error occur in posting" })
    }
})
//getting all found missing people
export const getAllFoundMissingPeople = asyncWrapper(async (req, res, next) => {
    try {
        const getAll = await foundMissingPersonModel.find()
        res.status(200).json({
            message: "all found missed people",
            missedPeaople: getAll
        })
    }
    catch (error) {
        return res.status(500).json({ message: "error occur in getting all found missing people" })
    }
})
//get a found missing person by his/her id
export const getFoundMissingPerson = asyncWrapper(async (req, res, next) => {
    try {
        const getOne = await foundMissingPersonModel.findById({ _id: req.query.id })
        if (!getOne) {
            return next(new customError("person not found", 404))
        }
        res.status(200).json({
            message: " found missed person ",
            person: getOne
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur in geting found missing person" })
    }
})
//delete a found missing person by his/her id
export const deleteFoundMissingPerson = asyncWrapper(async (req, res, next) => {
    try {
        const getOne = await foundMissingPersonModel.findByIdAndDelete({ _id: req.query.id })
        if (!getOne) {
            return next(new customError("person not found", 404))
        }
        res.status(200).json({
            message: " found missed person deleted successfully ",
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur in deleting found missing person" })
    }
})
//update a found missing person by his /her id
export const updateFoundMissingPerson = asyncWrapper(async (req, res, next) => {
    try {

        const foundPerson = await foundMissingPersonModel.findById({ _id: req.query.id })
        if (!foundPerson) {
            return next(new customError("person  not found", 404))
        }
        //check if one want to update a photo
        if (req.file) {
            const result = cloudinary.uploader.upload(req.file.path, function (err, result) {
                if (err) {
                    return res.status(500).json({ message: "there is error in updating photo !try again" })
                }
            })
            foundPerson.Photo.public_id = result.public_id
            foundPerson.Photo.url = result.url
            foundPerson.Photo.asset_id = result.asset_id
        }
        //check if one want to update found Place
        if (req.body['FoundPlace.Country']) {
            foundPerson.FoundPlace.Country = req.body['FoundPlace.Country']
        }
        if (req.body['FoundPlace.Province']) {
            foundPerson.FoundPlace.Province = req.body['FoundPlace.Province']
        }
        if (req.body['FoundPlace.District']) {
            foundPerson.FoundPlace.District = req.body['FoundPlace.District']
        }
        if (req.body['FoundPlace.Sector']) {
            foundPerson.FoundPlace.Sector = req.body['FoundPlace.Sector']
        }
        if (req.body['FoundPlace.Cell']) {
            foundPerson.FoundPlace.Cell = req.body['FoundPlace.Cell']
        }
        if (req.body['FoundPlace.Village']) {
            foundPerson.FoundPlace.Village = req.body['FoundPlace.Village']
        }

        //when there is other field to update
        const update = await foundMissingPersonModel.findByIdAndUpdate({ _id: req.query.id }, req.body, { new: true })
        if (!update) {
            return next(customError("document not found", 404))
        }
        await foundPerson.save()
        res.status(200).json({
            message: "updating found missing person",
            updatedData: update
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "error occur in updating found missing person" })
    }
})