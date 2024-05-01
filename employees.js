// const express = require("express");
// const router = express.Router();
// const Employee = require("../models/employees"); 


// router.put('/employees/:id', async (req, res) => {
//     try {
//         const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedEmployee);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


// router.delete('/employees/:id', async (req, res) => {
//     try {
//         const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
//         res.json(deletedEmployee);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


// router.patch('/employees/:id', async (req, res) => {
//     try {
//         const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedEmployee);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
// router.post('/employees', async (req, res) => {
//     const { Name, Department, Position, JoiningDate, Project, Salary } = req.body;
//     const employee = new Employee({Name, Department, Position, JoiningDate, Project, Salary });
//     try {
//       const newEmployee = await employee.save();
//       res.status(201).json(newEmployee);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

// // Get all employees
// router.get('/employees', async (req, res) => {
//     try {
//       const employees = await Employee.find();
//       res.json(employees);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
// //  employee by ID
// router.get('/employees/:id', async (req, res) => {
//     try {
//       const employee = await Employee.findById(req.params.id);
//       if (!employee) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
//       res.json(employee);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });  
// module.exports = router;
