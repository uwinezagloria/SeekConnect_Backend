// FOUND missing person model
import mongoose from "mongoose"
const personSchema=new mongoose.Schema({
    Email:{
        type:String
    },
FirstName:{
    type:String
},
LastName:{
    type:String
},
Race:{
    type:String,
    enum:["Caucasian/White","African/Black","Asian","Native American/Indigenous","Pacific Islander","Mixed Race/Multiracial","Other"]
    },
    CountryOfOrigin:{
        type:String
    },
    Age:{
        type:String
    },
   Photo: {
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
    FoundDate:{
        type:String
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
    ReturnedToOwner:{
        type:Boolean,
        default:false
    }
})
const foundMissingPersonModel=mongoose.model("foundPerson",personSchema)
export default foundMissingPersonModel