const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mail : {
        type : String,
    },
    mobile : {
        type : Number
    },
    password : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
        }
});


module.exports = mongoose.model("users", userSchema);