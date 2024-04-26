const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    Name:{
        type:String,
    },
    Department:{
        type:String,
    },
    Position:{
        type:String,
    },
    Salary:{
        type:String,
    },
    JoiningDate:{
        type:String
    },
    Project:{
        type:String
    },
})
const Employee=mongoose.model("Employee",employeeSchema);
module.exports=Employee;