const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Attendance = require("../models/attandance");

const { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay } = require('date-fns');

router.get("/monthly-report", async (req, res) => {
    try {
        const { username, month, year } = req.query;

        // Find the user by username and populate employee details
        const user = await User.findOne({ username }).populate('employee');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve attendance records for the user for the specified month and year
        const startDate = startOfMonth(new Date(year, month - 1, 1));
        const endDate = endOfMonth(new Date(year, month - 1, 1));
        const attendanceRecords = await getAttendanceRecords(user._id, startDate, endDate);

        // Calculate total working hours for the month
        const totalWorkingHours = calculateTotalWorkingHours(attendanceRecords);

        // Prepare the monthly report
        const monthlyReport = {
            username: user.username,
            employee: user.employee,
            month: month,
            year: year,
            totalWorkingHours: totalWorkingHours
            // Add other relevant fields as needed
        };

        res.status(200).json({ monthlyReport });
    } catch (error) {
        console.error("Error generating monthly report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/weekly-report", async (req, res) => {
    try {
        const { username, week, year } = req.query;

        // Find the user by username and populate employee details
        const user = await User.findOne({ username }).populate('employee');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve attendance records for the user for the specified week and year
        const startDate = startOfWeek(new Date(year, 0, 1));
        const endDate = endOfWeek(new Date(year, 0, 1));
        const attendanceRecords = await getAttendanceRecords(user._id, startDate, endDate);

        // Calculate total working hours for the week
        const totalWorkingHours = calculateTotalWorkingHours(attendanceRecords);

        // Prepare the weekly report
        const weeklyReport = {
            username: user.username,
            employee: user.employee,
            week: week,
            year: year,
            totalWorkingHours: totalWorkingHours
            // Add other relevant fields as needed
        };

        res.status(200).json({ weeklyReport });
    } catch (error) {
        console.error("Error generating weekly report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/daily-report", async (req, res) => {
    try {
        const { username, day, month, year } = req.query;

        // Find the user by username and populate employee details
        const user = await User.findOne({ username }).populate('employee');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve attendance records for the user for the specified day
        const startDate = startOfDay(new Date(year, month - 1, day));
        const endDate = endOfDay(new Date(year, month - 1, day));
        const attendanceRecords = await getAttendanceRecords(user._id, startDate, endDate);

        // Calculate total working hours for the day
        const totalWorkingHours = calculateTotalWorkingHours(attendanceRecords);

        // Prepare the daily report
        const dailyReport = {
            username: user.username,
            employee: user.employee,
            day: day,
            month: month,
            year: year,
            totalWorkingHours: totalWorkingHours
            // Add other relevant fields as needed
        };

        res.status(200).json({ dailyReport });
    } catch (error) {
        console.error("Error generating daily report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Function to retrieve attendance records for the specified user and date range
// Function to retrieve attendance records for the specified user and date range
async function getAttendanceRecords(userId, startDate, endDate) {
    try {
        // Ensure startDate and endDate are valid Date objects
        if (!(startDate instanceof Date && !isNaN(startDate.valueOf())) || 
            !(endDate instanceof Date && !isNaN(endDate.valueOf()))) {
            throw new Error("Invalid date range");
        }

        return await Attendance.find({
            userId: userId,
            checkInTime: { $gte: startDate, $lt: endDate }
        });
    } catch (error) {
        console.error("Error retrieving attendance records:", error);
        throw error; // Rethrow the error to be handled in the route handler
    }
}

// Function to calculate total working hours from attendance records
function calculateTotalWorkingHours(attendanceRecords) {
    let totalWorkingHours = 0;
    attendanceRecords.forEach(record => {
        if (record.WorkingHours) {
            totalWorkingHours += record.WorkingHours;
        }
    });
    return totalWorkingHours;
}

module.exports = router;
