const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Department: {
        type: String,
    },
    Position: {
        type: String,
    },
    Salary: {
        type: String,
    },
    JoiningDate: {
        type: String
    },
    Project: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type:String
    },
    isAdmin: {
        type: Boolean,
        default: false // Default value is false for regular users
    },
});



const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
