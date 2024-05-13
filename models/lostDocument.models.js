//models for lost product
import mongoose from "mongoose"
const lostSchema=new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SignUp"
    },
DocumentType:{
type:String,
enum:["Drivers License","National Id Card","Health Insurance Card","Refugee Identity Document","Othe Form Of Identity"]
},
    NameOnDocument:{
    type:String
},
PlaceOfIssueOnDocument:{
    type:String
},
LostDate:{
    type:Date
},
LostPlace:{
   Country: {
type:String
    },
    Province:{
        type:String
    },
    District:{
        type:String
    },
    Sector:{
        type:String
    },
    Cell:{
        type:String
    }, 
    Village:{
        type:String
    }
},
Comment:{
type:String
},
found:{
    type:Boolean,
    default:false
}
})
const lostDocumentModel=mongoose.model("LostDocument",lostSchema)
export default lostDocumentModel