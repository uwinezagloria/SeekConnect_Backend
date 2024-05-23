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
        type: Number
    },
    Photo: {
        public_id: {
            type: String
        },
        url: {
            type: String
        },
        asset_id: {
            type: String
        }
    },
    LostDate: {
        type: String
    },
    LostPlace: {
        Country: {
            type: String,
            required: true
        },
        Province: {
            type: String,
            required: true
        },
        District: {
            type: String,
            required: true
        },
        Sector: {
            type: String,
            required: true
        },
        Cell: {
            type: String,
            required: true
        },
        Village: {
            type: String,
            required: true
        }
    },
    Comment: {
        type: String
    },
    Found: {
        type: Boolean,
        default: false
    }
})
const missingPersonModel = mongoose.model("MissingPerson", personSchema)
export default missingPersonModel