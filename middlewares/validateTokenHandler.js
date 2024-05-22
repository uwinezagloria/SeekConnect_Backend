import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import customError from "./customError.js";
// Validate token middleware
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }
    
    if (!token) {
        return next(new customError("User is not authorized or token is missing", 401));
    }
    
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new customError("User is not authorized", 401));
        }
        req.user = decoded;
        console.log(req.user)
        next()
    })
})

export default validateToken;
