import asyncWrapper from "../middlewares/async.js";
import foundDocumentModel from "../models/foundDocuments.models.js";
import foundMissingPersonModel from "../models/foundMissingPerson.models.js";
import lostDocumentModel from "../models/lostDocument.models.js";
import missingPersonModel from "../models/missingPerson.models.js";

export const notification=asyncWrapper(async(req,res,next)=>{
    try{
      const foundDocument= await foundDocumentModel.find()
const lostDocument=await lostDocumentModel.find()
let nameOnFound=[];
let nameOnLost=[];
let capital;
 let sortedFound=[];
 let sortedLost=[];
 let names=[];
 let name=[];
let joinedLost;
let joinedFound;
 //make an array which have names that are on  founddocuments and store them in uppercase and also sort them
for(let i=0;i<foundDocument.length;i++){
    let arr1=foundDocument[i].NameOnDocument.trim().split(" ,")
    capital=arr1.toString().toUpperCase()
       nameOnFound.push(capital) 
    }
    
    //make an array of which will store fullnams differently
    for(let i=0;i<nameOnFound.length;i++){
let arr=nameOnFound[i].split(" ")
    names.push(arr)
    }
    //sort at each index
    for(let i=0;i<names.length;i++){
        sortedFound.push(names[i].sort())
    }
    //make an array which will store sorted names on lost document and put names in uppercase
    

    for(let i=0;i<lostDocument.length;i++){
        let arr1=lostDocument[i].NameOnDocument.trim().split(" ,")
        capital=arr1.toString().toUpperCase()
           nameOnLost.push(capital) 
           
           //make an array of which will store fullnams differently
           for(let i=0;i<nameOnLost.length;i++){
               let arr=nameOnLost[i].split(" ")
               name.push(arr)
            }
            //sort at each index
            for(let i=0;i<name.length;i++){
                sortedLost.push(name[i].sort())
            }
           //compare names in lost and those in found
for(let i=0;i<sortedFound.length;i++){
    for(let j=0;j<sortedLost.length;j++){
        joinedFound=sortedFound[i].join("")
         joinedLost=sortedLost[j].join("")
         if(joinedFound===joinedLost){
             return res.status(200).json({message:`the ${lostDocument[i].DocumentType} document reported by  ${lostDocument[i].Email}  is found`})
         }
         res.status(404).json({message:"there is no notification"})
    }
} 
        }
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:"error in sending notification"})
    }
})