const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Attendance = require("../models/attandance");
const moment = require("moment");

router.get("/monthly-report", async (req, res) => {
    try {
        const { username, month, year } = req.query;

        // Find the user by username and populate employee details
        const user = await User.findOne({ username }).populate('employee');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calculate start and end dates for the specified month using moment.js
        const startDate = moment({ year, month: month - 1 }).startOf('month').toDate();
        const endDate = moment({ year, month: month - 1 }).endOf('month').toDate();

        // Retrieve attendance records for the user for the specified month
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

        // Calculate start and end dates for the specified week using moment.js
        const startDate = moment({ year }).isoWeek(week).startOf('isoWeek').toDate();
        const endDate = moment({ year }).isoWeek(week).endOf('isoWeek').toDate();

        // Retrieve attendance records for the user for the specified week
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

        // Calculate start and end dates for the specified day using moment.js
        const startDate = moment({ year, month: month - 1, day }).startOf('day').toDate();
        const endDate = moment({ year, month: month - 1, day }).endOf('day').toDate();

        // Retrieve attendance records for the user for the specified day
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

async function getAttendanceRecords(userId, startDate, endDate) {
    try {
        // Retrieve attendance records for the specified date range
        return await Attendance.find({
            userId: userId,
            checkInTime: { $gte: startDate, $lte: endDate }
        });
    } catch (error) {
        console.error("Error retrieving attendance records:", error);
        throw error;
    }
}

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
