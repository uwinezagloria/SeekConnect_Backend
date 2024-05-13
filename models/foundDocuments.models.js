//models for FOUND lost product
import mongoose from "mongoose"
const foundSchema=new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:SignUp
    },
DocumentType:{
type:string,
enum:["Drivers License","National Id Card","Health Insurance Card","Refugee Identity Document","Othe Form Of Identity"]
},
    NameOnDocument:{
    type:string
},
PlaceOfIssueOnDocument:{
    type:String
},
FoundDate:{
    type:Date
},
FoundPlace:{
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
type:string
},
})
const foundDocumentModel=mongoose.model("foundDocument",foundSchema)
export default foundDocumentModel