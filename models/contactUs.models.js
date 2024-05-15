import mongoose from "mongoose"
const contactUsSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Tel:{
type:String
    },
    Message:{
        type:String
    }
})
const contactUsModel=mongoose.model("Contact Us",contactUsSchema)
export default contactUsModel