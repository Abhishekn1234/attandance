const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const EmployeeRoutes = require("./routes/employees");
const attandanceRoutes = require("./routes/attandance");
const employeeRoutes = require("./routes/employeereport");
const adminRoutes = require('./routes/admin');
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/User";

// Options to pass to MongoDB driver during connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


mongoose
  .connect(mongoURI, options)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  });

// Define routes
app.use("", userRoutes);
app.use("", EmployeeRoutes);
app.use("", attandanceRoutes);
app.use("", employeeRoutes);
app.use("", adminRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
