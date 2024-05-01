// const express = require("express");
// const router = express.Router();
// const Attendance = require("../models/attandance");

// // PATCH route to update attendance record
// router.patch("/attendance/:id", async (req, res) => {
//     try {
//         const { checkInTime, checkOutTime } = req.body;

//         const startTime = new Date(checkInTime);
//         const endTime = new Date(checkOutTime);
//         const workingHours = (endTime - startTime) / (1000 * 60 * 60); // in hours

//         const updatedAttendance = await Attendance.findByIdAndUpdate(
//             req.params.id,
//             { checkInTime, checkOutTime, workingHours },
//             { new: true }
//         );

//         res.json(updatedAttendance);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// // PUT route to update attendance record
// router.put("/attendance/:id", async (req, res) => {
//     try {
//         const { checkInTime, checkOutTime } = req.body;

//         const startTime = new Date(checkInTime);
//         const endTime = new Date(checkOutTime);
//         const workingHours = (endTime - startTime) / (1000 * 60 * 60); // in hours

//         const updatedAttendance = await Attendance.findByIdAndUpdate(
//             req.params.id,
//             { checkInTime, checkOutTime, workingHours },
//             { new: true }
//         );

//         res.json(updatedAttendance);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// // DELETE route to delete attendance record
// router.delete("/attendance/:id", async (req, res) => {
//     try {
//         const deletedAttendance = await Attendance.findByIdAndDelete(
//             req.params.id
//         );
//         res.json(deletedAttendance);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// module.exports = router;
