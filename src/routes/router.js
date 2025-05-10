const express = require("express")

const router = express.Router()

const userRouter = require("./user/user");
const activityRouter = require("./activity/activity");
const bookingRouter = require("./bookings/booking");

router.use("/user", userRouter)
router.use("/activity", activityRouter)
router.use("/booking", bookingRouter)

module.exports = router;