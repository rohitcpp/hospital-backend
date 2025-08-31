require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const bodyParser=require("body-parser");
const connectDB = require('./src/config/db');

// Connect to DB
connectDB();

const app = express();
app.use(bodyParser.json());

// Routes
const patientRoutes = require('./src/routes/patient');
const deptRoutes = require('./src/routes/dept');
const doctorRoutes = require('./src/routes/doctorroutes');
const appointmentRoutes = require('./src/routes/appointment');
const authRoutes = require('./src/routes/authroute');

//mounted routes
app.use("/api/patients", patientRoutes);
app.use("/api/departments", deptRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
