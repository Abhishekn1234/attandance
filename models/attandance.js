const mongoose=require("mongoose");

const attandanceSchema=new mongoose.Schema({
    Name:{
        type:String,
        ref:'Employee'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    checkInTime:{
        type:Date,
    },
    checkOutTime:{
        type:Date,
    },
    WorkingHours:{
        type:Number
    }
})
const AttandanceSchema=mongoose.model("Attandance",attandanceSchema);
module.exports=AttandanceSchema;