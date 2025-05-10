const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userDB = require("../../models/users/user");



router.post("/register", async(req, res) => {
    try{
    const data = req.body;

    const existingUser = await userDB.findOne({ mail: data.mail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    console.log(data);
    const hashPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashPassword;
    const user = new userDB(data);
    await user.save();
    return res.status(200).json({
        success : true,
        message : "User registered successfully",
        data : user
    });
}catch(error){
    return res.status(500).json({
        success : false,
        message : error.message
    });
}
});

router.post("/login", async(req, res) => {//
  try {
    const { mail, password } = req.body;
    console.log(mail, password);
    const user = await userDB.findOne({ mail: mail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({
      success: true,
      data: {
        token: token,
        user: user,
      },
      message: "Login successfully",
      
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



router.get("/get-all-users", async(req, res) => {
    try{
        const skip = req.query.skip || 0;
        const limit = req.query.limit || 10;
        const users = await userDB.find().skip(skip).limit(limit);
        return res.status(200).json({
            success : true,
            message : "Users fetched successfully",
            data : users
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});



router.get("/get-user-by-id/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const user = await userDB.findById(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        return res.status(200).json({
            success : true,
            data : user,
            message : "User data fetched successfully"
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
});



router.put("/update-user/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const user = await userDB.findByIdAndUpdate(id, data, {new : true});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        return res.status(200).json({
            success : true,
            data : user,
            message : "User updated successfully"
        });
    }catch(error){
        return res.status(500).json({       
            success : false,
            message : error.message
        });
    }
});



router.delete("/delete-user/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const user = await userDB.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        return res.status(200).json({
            success : true,
            data : user,
            message : "User deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : error.message 
        });
    }
})         


module.exports = router;

