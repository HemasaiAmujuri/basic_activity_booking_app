const express = require("express");
const router = express.Router();
const bookingDB = require("../../models/bookings/booking");
const authMiddleware = require("../middleware/middleware");


router.post("/create-booking", authMiddleware, async(req, res) => {
    try{
        const { activityId, userId, bookingStatus } = req.body;
        const booking = new bookingDB({ activityId, userId, bookingStatus });
        await booking.save();   
        return res.status(200).json({
            success : true,
            message : "Booking created successfully",
            data : booking
        }); 
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.get("/get-all-bookings", async(req, res) => {
    try{
        const skip = req.query.skip || 0;
        const limit = req.query.limit || 10;
        const bookings = await bookingDB.find().skip(skip).limit(limit);
        return res.status(200).json({
            success : true,
            data : bookings,
            message : "Bookings fetched successfully",
            });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.get("/get-booking-by-id/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const booking = await bookingDB.findById(id);
        if(!booking){
            return res.status(404).json({
                success : false,
                message : "Booking not found"
            });
        }
        return res.status(200).json({
            success : true,
            data : booking,
            message : "Booking fetched successfully"
        });
    }catch(error){  
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.put("/update-booking/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const booking = await bookingDB.findByIdAndUpdate(id, data, {new : true});
        if(!booking){
            return res.status(404).json({
                success : false,
                message : "Booking not found"
            });
        }       
        return res.status(200).json({
            success : true,
            message : "Booking updated successfully",
            data : booking
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.delete("/delete-booking/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const booking = await bookingDB.findByIdAndDelete(id);
        if(!booking){
            return res.status(404).json({
                success : false,
                message : "Booking not found"
            });
        }
        return res.status(200).json({
            success : true,
            message : "Booking deleted successfully",
            data : booking
        });
    }catch(error){  
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.get("/get-bookings-by-user/:userId", async(req, res) => {
    try{
        const userId = req.params.userId;
        const bookings = await bookingDB.find({userId});
        return res.status(200).json({
            success : true,
            message : "Bookings fetched successfully",
            data : bookings
        });
    }catch(error){      
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.get("/get-bookings-by-activity/:activityId", async(req, res) => {
    try{
        const activityId = req.params.activityId;
        const bookings = await bookingDB.find({activityId});
        return res.status(200).json({
            success : true,
            message : "Bookings fetched successfully",
            data : bookings
        });
    }catch(error){  
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


module.exports = router;
