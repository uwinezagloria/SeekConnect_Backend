//models for FOUND lost product
import mongoose from "mongoose"
const foundSchema=new mongoose.Schema({
    Email:{
      type:String
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
FoundDate:{
    type:String
},
Photo:{
    public_id:{
type:String
    },
    asset_id:{
        type:String
    },
    url:{
        type:String
    }
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
type:String
},
returnedToOwner:{
    type:Boolean,
    default:false
}
})
const foundDocumentModel=mongoose.model("foundDocument",foundSchema)
export default foundDocumentModel