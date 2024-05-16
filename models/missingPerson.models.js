//missing person model
import mongoose from "mongoose"
const personSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignUp"
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Race: {
        type: String,
        enum: ["Caucasian/White", "African/Black", "Asian", "Native American/Indigenous", "Pacific Islander", "Mixed Race/Multiracial", "Other"]
    },
    CountryOfOrigin: {
        type: String
    },
    Age: {
        type: String
    },
    Photo: {
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    LostDate: {
        type: Date
    },
    LostPlace: {
        Country: {
            type: String
        },
        Province: {
            type: String
        },
        District: {
            type: String
        },
        Sector: {
            type: String
        },
        Cell: {
            type: String
        },
        Village: {
            type: String
        }
    },
    Comment: {
        type: String
    },
    found: {
        type: Boolean,
        default: false
    }
})
const missingPersonModel = mongoose.model("MissingPerson", personSchema)
export default missingPersonModel