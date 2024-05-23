import customError from "./customError.js"

//function to protect routes for the admin only
const onlyAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next()
        }
        else {
            return next(new customError("Forbidden", 403))
        }
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "an error occur,try again!" })
    }
}
export default onlyAdmin