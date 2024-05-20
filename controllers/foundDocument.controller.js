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
export const updateFoundDocument = asyncWrapper(async (req, res, next) => {
    const foundDocument = await foundDocumentModel.findById({ _id: req.query.id })
    if (!foundDocument) {
        return next(new customError("Document not found", 404))
    }
    //check if one want to update a photo
    if (req.file) {
        const result = cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                return res.status(500).json({ message: "there is error in updating photo !try again" })
            }
        })
        foundDocument.Photo.public_id = result.public_id
        foundDocument.Photo.url = result.url
        foundDocument.Photo.asset_id = result.asset_id
    }
    //check if one want to update found Place
    if (req.body['FoundPlace.Country']) {
        foundDocument.FoundPlace.Country = req.body['FoundPlace.Country']
    }
    if (req.body['FoundPlace.Province']) {
        foundDocument.FoundPlace.Province = req.body['FoundPlace.Province']
    }
    if (req.body['FoundPlace.District']) {
        foundDocument.FoundPlace.District = req.body['FoundPlace.District']
    }
    if (req.body['FoundPlace.Sector']) {
        foundDocument.FoundPlace.Sector = req.body['FoundPlace.Sector']
    }
    if (req.body['FoundPlace.Cell']) {
        foundDocument.FoundPlace.Cell = req.body['FoundPlace.Cell']
    }
    if (req.body['FoundPlace.Village']) {
        foundDocument.FoundPlace.Village = req.body['FoundPlace.Village']
    }

    //when there is other field to update
    const update = await foundDocumentModel.findByIdAndUpdate({ _id: req.query.id }, req.body, { new: true })
    if (!update) {
        return next(customError("document not found", 404))
    }
    await foundDocument.save()
    res.status(200).json({
        message: "updating found document",
        updatedData: update
    })
})
//get found document by id
export  const getFoundDocument=asyncWrapper(async(req,res,next)=>{
const getFoundOne=await foundDocumentModel.findById({_id:req.query.id})
if(!getFoundOne){
    return next(new customError("document not found",404))
}
res.status(200).json({
    message:"get one found document by it's id",
documenta:getFoundOne
})
})
//delete found document
export const deleteFoundDocument=asyncWrapper(async(req,res,next)=>{
    const document=await foundDocumentModel.findByIdAndDelete({_id:req.query.id})
    if(!document){
return next(new customError("document not found",404))
    }
    res.status(200).json({message:"document deleted successfully"})
})