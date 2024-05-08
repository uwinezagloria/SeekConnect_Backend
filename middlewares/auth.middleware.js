
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const authenticateUser = async (req, res, next) => {
  try {
    // Log the token received in the request header
    console.log("Token received:", req.header("Authorization"));

    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    // Log successful authentication
    console.log("User authenticated:", user);

    next();
  } catch (error) {
    console.error("Authentication failed:", error.message);
    res.status(401).json({ error: "Please authenticate" });
  }
};
