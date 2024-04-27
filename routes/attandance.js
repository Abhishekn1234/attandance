const express = require("express");
const router = express.Router();
const AttandanceSchema = require("../models/attandance");
router.patch("/attendance/:id", async (req, res) => {
    try {
      const { Name, checkInTime, checkOutTime } = req.body;
  
      // Calculate working hours
      const startTime = new Date(checkInTime);
      const endTime = new Date(checkOutTime);
      const workingHours = (endTime - startTime) / (1000 * 60 * 60); // in hours
  
      // Update attendance record
      const updatedAttendance = await AttandanceSchema.findByIdAndUpdate(
        req.params.id,
        { Name, checkInTime, checkOutTime, WorkingHours: workingHours },
        { new: true }
      );
      if (!updatedAttendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }
      res.json(updatedAttendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


// Delete attendance record
router.delete("/attendance/:id", async (req, res) => {
  try {
    const deletedAttendance = await AttandanceSchema.findByIdAndDelete(
      req.params.id
    );
    res.json(deletedAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

///

router.get("/attendance", async (req, res) => {
  try {
    const allAttendance = await AttandanceSchema.find();
    res.json(allAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/attendance", async (req, res) => {
  try {
    const { Name, checkInTime, checkOutTime } = req.body;

    // Calculate working hours
    const startTime = new Date(checkInTime);
    const endTime = new Date(checkOutTime);
    const workingHours = (endTime - startTime) / (1000 * 60 * 60); // in hours

    const newAttendance = new AttandanceSchema({
      Name,
      checkInTime,
      checkOutTime,
      WorkingHours: workingHours,
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/attendance/:id", async (req, res) => {
  try {
    const attendance = await AttandanceSchema.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
