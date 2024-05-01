// adminRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const verifyToken = require('../middleware/verifytoken');
const secret = 'secret';
const jwt=require("jsonwebtoken");

// Define a route to insert sample admin data
// router.post('/insert-sample-admins', async (req, res) => {
//     try {
//         // Sample admin data
//         const sampleAdminData = [
//             { username: 'admin1', password: 'password1', email: 'admin1@example.com', isAdmin: true },
//             { username: 'admin2', password: 'password2', email: 'admin2@example.com', isAdmin: true },
//             // Add more sample data as needed
//         ];

//         // Insert sample admin data
//         const insertedAdmins = await Admin.insertMany(sampleAdminData);
//         res.status(201).json({ message: 'Sample admin data inserted successfully', insertedAdmins });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
// Admin login route
router.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: admin.username, isAdmin: admin.isAdmin }, secret, {
            expiresIn: '7d' // Token expires in 1 hour
        });
        console.log(token);
        res.status(200).json({ message: 'Login successful', admin, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.get('/admin-login/dashboard',verifyToken, async (req, res) => {
//     try {
//         // Access user information from decoded token in req.user
//         const admin = await Admin.findOne({ username: req.admin.username });
//         if (!admin) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json({ message: 'Dashboard accessed', admin });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// Add more admin routes as needed

module.exports = router;