const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoURI = "mongodb://0.0.0.0:27017/User";

// Options to pass to MongoDB driver during connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
};

// Connect to MongoDB using mongoose.connect
mongoose.connect(mongoURI, options)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    });

// Define routes
app.use("", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
