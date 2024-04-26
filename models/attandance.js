const mongoose=require("mongoose");

const attandanceSchema=new mongoose.Schema({
    Name:{
        type:String,
    },
    checkInTime:{
        type:String,
    },
    checkOutTime:{
        type:String,
    },
    WorkingHours:{
        type:Number
    }
})
const AttandanceSchema=mongoose.model("Attandance",attandanceSchema);
module.exports=AttandanceSchema;