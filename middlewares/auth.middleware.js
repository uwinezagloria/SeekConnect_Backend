
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const authenticateUser = async (req, res, next) => {
  try {
    // Log the token received in the request body
    console.log("Token received in body:", req.body.token);

    // Extract the token from the request body
    const token = req.body.token;

    // Check if the token is missing or undefined
    if (!token) {
      // If token is missing, return an error response
      console.error("Token is missing in the request body");
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      // If user is not found, return an error response
      console.error("User not found");
      throw new Error();
    }

    // Set the token and user information in the request object
    req.token = token;
    req.user = user;

    // Log successful authentication
    console.log("User authenticated:", user);

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Log and return an error response if authentication fails
    console.error("Authentication failed:", error.message);
    res.status(401).json({ error: "Unauthorized: Authentication failed" });
  }
};
