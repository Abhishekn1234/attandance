const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const crypto = require("crypto");
const axios = require('axios');
const nodemailer = require("nodemailer");
const twilio = require('twilio');
const twilioClient = twilio('AC10ed20dae4ea30f63276d2da75666f02', '075099c149eadcc8ba0ec28e2bd6aba6');

// Route for user registration
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, ConfirmPassword, Designation } = req.body;
        
        // Check if password and confirm password match
        if (password !== ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashPassword = await bcrypt.hash(ConfirmPassword, 10);

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            ConfirmPassword:hashPassword,
            Designation
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save the OTP to the user's document in the database
        await User.findOneAndUpdate({ email }, {
            $set: {
                passwordResetOTP: otp,
                passwordResetOTPIssuedAt: Date.now() // Record when the OTP was issued
            }
        });

        // Send the OTP via SMS using Twilio
        await twilioClient.messages.create({
            body: `Your OTP for password reset is: ${otp}`,
            to: '+916238519397', // Replace with the user's phone number
            from: '+13132283991' // Your Twilio phone number
        });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, otp: otpString, newPassword, confirmPassword } = req.body;
        const otp = parseInt(otpString);
        console.log(otp);
        
        // Find the user by email
        const user = await User.findOne({ email });
        console.log(user);
        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        
       
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

       
        user.password = hashedPassword;
        user.otp = otp;
        user.passwordResetOTPIssuedAt = Date.now();
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Failed to reset password" });
    }
});




module.exports = router;
