const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    activityId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "activities",
        required : true
    },
    bookingDate : {
        type : Date,
        default : Date.now
    },
    bookingStatus : {
        type : String,
        default : "pending"
    },
      //common fields
    isDeleted : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("bookings", bookingSchema);
