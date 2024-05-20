import lostDocumentModel from "../models/lostDocument.models.js";
import missingPersonModel from "../models/missingPerson.models.js";
import asyncWrapper from "../middlewares/async.js";
import customError from "../middlewares/customError.js";

export const filterByCategory = asyncWrapper(async (req, res, next) => {
  const { category } = req.body;

  if (!category) {
    return next(new customError("Category is required", 400));
  }

  let results;
  if (category === "LostDocument") {
    results = await lostDocumentModel.find();
  } else if (category === "MissingPerson") {
    results = await missingPersonModel.find();
  } else {
    return next(new customError("Invalid category", 400));
  }

  res.status(200).json({
    status: "success",
    results: results.length,
    data: results,
  });
});
