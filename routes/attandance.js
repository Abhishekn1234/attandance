const express = require("express");
const router = express.Router();
const AttandanceSchema = require("../models/attandance");
router.patch("/attendance/:id", async (req, res) => {
    try {
      const { checkInTime, checkOutTime } = req.body;
  
      // Calculate working hours
      const startTime = new Date(checkInTime);
      const endTime = new Date(checkOutTime);
      const workingHours = (endTime - startTime) / (1000 * 60 * 60); // in hours
  
      // Update attendance record
      const updatedAttendance = await AttandanceSchema.findByIdAndUpdate(
        req.params.id,
        { checkInTime, checkOutTime, WorkingHours: workingHours },
        { new: true }
      );
  
      res.json(updatedAttendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
// Update attendance record
router.put("/attendance/:id", async (req, res) => {
  try {
    const { checkInTime, checkOutTime } = req.body;

    // Calculate working hours
    const startTime = new Date(checkInTime);
    const endTime = new Date(checkOutTime);
    const workingHours = (endTime - startTime) / (1000 * 60 * 60); // in hours

    // Update attendance record
    const updatedAttendance = await AttandanceSchema.findByIdAndUpdate(
      req.params.id,
      { checkInTime, checkOutTime, WorkingHours: workingHours },
      { new: true }
    );

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

module.exports = router;
