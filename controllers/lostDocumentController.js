import asyncWrapper from "../middlewares/async.js";
import { validationResult } from 'express-validator'
import customError from "../middlewares/customError.js";
import lostDocumentModel from "../models/lostDocument.models.js";
//controller for lost documents
export const createLostDocument = asyncWrapper(async (req, res, next) => {
    //validate
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new customError("Bad Request", 403))
    }
    //create lostDocument
    const document = await lostDocumentModel.create(req.body)
    res.status(201).json({
        message: "lost created successfully",
        details: document
    })
})
//get lost documents
export const getLostDocuments = asyncWrapper(async (req, res, next) => {
    const getLosts = await lostDocumentModel.find()
    res.status(200).json({
        message: "all lost documents",
        documents: getLosts
    })
})
//update lost documents
export const updateLostDocument = asyncWrapper(async (req, res, next) => {
    const update = await lostDocumentModel.findByIdAndUpdate({ _id: req.query.id }, req.body, { new: true })
    if (!update) {
        return next(new customError("Document not found!try again", 404))
    }
    res.status(200).json({
        message: "document updated successfully",
        document: update
    })
})
//delete lost document
export const deleteLostDocument = asyncWrapper(async (req, res, next) => {
    const remove = await lostDocumentModel.findByIdAndDelete({ _id: req.query.id })
    if (!remove) {
        return next(new customError("document not found!try again", 404))
    }
    res.status(200).json({
        message: "lost Document deleted successfully"
    })
})