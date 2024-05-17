// search.controller.js

import asyncWrapper from "../middlewares/async.js";
import customError from "../middlewares/customError.js";
import LostDocument from "../models/lostDocument.models.js";
import MissingPerson from "../models/missingPerson.models.js";

// Search controller function
export const searchDocumentsAndPersons = asyncWrapper(
  async (req, res, next) => {
    const { name } = req.body;

    // Validate if 'name' exists
    if (!name) {
      throw new customError("Name is required for search.", 400);
    }

    // Search documents
    const documents = await LostDocument.find({ NameOnDocument: name });

    // Search missing persons
    const persons = await MissingPerson.find({ FirstName: name });

    // Combine results
    const searchResults = {
      documents,
      persons,
    };

    // Send response
    res.status(200).json(searchResults);
  }
);
