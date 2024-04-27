const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Attendance = require("../models/attandance");

// Route to generate monthly report
router.get("/monthly-report", async (req, res) => {
    try {
        const { username, month, year } = req.query;

        // Find the user by username and populate employee details
        const user = await User.findOne({ username }).populate('employee');
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve attendance records for the user for the specified month and year
        const startDate = new Date(year, month - 1, 1); // Month is 0-indexed, so subtract 1
        const endDate = new Date(year, month, 0); // Get the last day of the month
        console.log(startDate,endDate);
        const attendanceRecords = await Attendance.find({
            userId: user._id,
            checkInTime: { $gte: startDate, $lt: endDate }
        });
        console.log(attendanceRecords);

       // Calculate total working hours for the month
// Calculate total working hours for the month
// Calculate total working hours for the month
let totalWorkingHours = 0;
attendanceRecords.forEach(record => {
    if (record.WorkingHours) {
        // Add working hours for each record
        totalWorkingHours += record.WorkingHours;
    }
});

// Convert totalWorkingHours to hours if needed (e.g., if it's in minutes or seconds)
const totalWorkingHoursInHours = totalWorkingHours / 3600; // Assuming duration is in seconds





        // Prepare the monthly report
        const monthlyReport = {
            username: user.username,
            employee: user.employee,
            month: month,
            year: year,
            totalWorkingHours: totalWorkingHoursInHours
            // Add other relevant fields as needed
        };

        res.status(200).json({ monthlyReport });
    } catch (error) {
        console.error("Error generating monthly report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
