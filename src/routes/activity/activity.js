const express = require("express");
const router = express.Router();
const activityDB = require("../../models/activity/activity");


router.post("/create-activity", async(req, res) => {
    try{
        const data = req.body;
        const activity = new activityDB(data);
        await activity.save();
        return res.status(200).json({
            success : true,
            message : "Activity created successfully",
            data : activity
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.get("/get-all-activities", async(req, res) => {
    try{
        const skip = req.query.skip || 0;
        const limit = req.query.limit || 10;
        const activities = await activityDB.find().skip(skip).limit(limit);
        return res.status(200).json({
            success : true,
            data : activities,
            message : "Activities fetched successfully",
        });
    }catch(error){  
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.get("/get-activity-by-id/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const activity = await activityDB.findById(id);
        if(!activity){
            return res.status(404).json({
                success : false,
                message : "Activity not found"
            });
        }
        return res.status(200).json({
            success : true,
            data : activity,
            message : "Activity fetched successfully"
        });
    }catch(error){
        return res.status(500).json({                                               
            success : false,
            message : error.message
        });
    }
});


router.put("/update-activity/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const activity = await activityDB.findByIdAndUpdate(id, data, {new : true});
        if(!activity){
            return res.status(404).json({
                success : false,
                message : "Activity not found"
            });
        }
        return res.status(200).json({
            success : true,
            message : "Activity updated successfully",
            data : activity
        }); 
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


router.delete("/delete-activity/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const activity = await activityDB.findByIdAndDelete(id);
        if(!activity){
            return res.status(404).json({
                success : false,
                message : "Activity not found"
            });
        }
        return res.status(200).json({
            success : true,
            data : activity,
            message : "Activity deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});


module.exports = router;