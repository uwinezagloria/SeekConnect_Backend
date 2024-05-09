import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
   FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
   Email:{
    type:String
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
   }
})
const userModel=mongoose.model("SignUp",userSchema)
export default userModel