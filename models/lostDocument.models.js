//models for lost product
import mongoose from "mongoose"
const lostSchema=new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SignUp"
    },
DocumentType:{
type:String,
enum:["Drivers License","National Id Card","Health Insurance Card","Refugee Identity Document","Other Form Of Identity"]
},
    NameOnDocument:{
    type:String
},
PlaceOfIssueOnDocument:{
    type:String
},
LostDate:{
    type:String
},
LostPlace:{
   Country: {
type:String,
required:[true,"country is required"]
    },
    Province:{
        type:String,
        required:[true,"Province is required"]
    },
    District:{
        type:String,
        required:[true,"District is required"]
    },
    Sector:{
        type:String,
        required:[true,"sector is required"]
    },
    Cell:{
        type:String,
        required:[true,"cell is required"]
    }, 
    Village:{
        type:String,
        required:[true,"village is required"]
    }
},
Comment:{
type:String
},
Found:{
    type:Boolean,
    default:false
}
})
const lostDocumentModel=mongoose.model("LostDocument",lostSchema)
export default lostDocumentModel