import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
   FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
   Email:{
    type:String,
    unique:[true,"invalid email"]
   },
   Password:{
    type:String
   },
   ConfirmPassword:{
type:String
   },
   otp:{
    type:Number
   },
   otpExpiration:{
    type:Date
   },
   otpVerified:{
    type:Boolean,
    default:false
   },
    role:{
      enum:["admin","user"],
      type:String,
      default:"user"
    }

})
const userModel=mongoose.model("SignUp",userSchema)
export default userModel