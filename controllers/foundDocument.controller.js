import asyncWrapper from "../middlewares/async.js";
import customError from "../middlewares/customError.js";
import foundDocumentModel from "../models/foundDocuments.models.js";
import cloudinary from "../utils/cloudinary.js";

//post a found document
export const postFoundDocument = asyncWrapper(async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "error in uploading file" })
            }
        })
        //create foundDocument
        const newFound = new foundDocumentModel({
            UserId: req.body.UserId,
            DocumentType: req.body.DocumentType,
            NameOnDocument: req.body.NameOnDocument,
            PlaceOfIssueOnDocument: req.body.PlaceOfIssueOnDocument,
            FoundDate: req.body.FoundDate,
            Photo: {
                public_id: result.public_id,
                asset_id: result.asset_id,
                url: result.url
            },
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
        const saveDocument = await newFound.save()
        if (!saveDocument) {
            return next(new customError("error occur in saving document,try again", 500))
        }
        res.status(200).json({
            message: "posted found document successfully",
            document: saveDocument
        })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "error occur in posting found document" })
    }
})
//getting all found documents
export const getAllFoundDocument = asyncWrapper(async (req, res, next) => {
    try {
        const getAll = await foundDocumentModel.find()
        res.status(200).json({
            message: "getting all found document",
            foundDocuments: getAll
        })
    }
    catch (error) {
        return res.status(500).json({ message: "error occur in getting all found document" })
    }
})
//updating found Document
