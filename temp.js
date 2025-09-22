const mongoose = require("mongoose");
const Appointment = require("./src/models/appointment");
const fs = require("fs");

async function insertAppointments() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/hospital-backend");
    console.log("MongoDB connected");

    // Load appointments.json
    const data = fs.readFileSync("user.json", "utf-8");
    const appointments = JSON.parse(data);

    // Clear old appointments
    await Appointment.deleteMany({});
    console.log("Old appointments cleared");

    // Insert new appointments
    await Appointment.insertMany(appointments);
    console.log("Appointments inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error inserting appointments:", err);
    process.exit(1);
  }
}

insertAppointments();
