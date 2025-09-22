const mongoose = require("mongoose");
const Department = require("./src/models/Department");
const fs = require("fs");

async function insertDepartments() {
  try {
    // connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/hospital-backend", {
      // no need for deprecated options in mongoose v6+
    });
    console.log("MongoDB connected");

    // load departments.json
    const data = fs.readFileSync("user.json", "utf-8");
    const departments = JSON.parse(data);

    // clear old departments
    await Department.deleteMany({});
    console.log("Old departments cleared");

    // insert new departments
    await Department.insertMany(departments);
    console.log("Departments inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error inserting departments:", err);
    process.exit(1);
  }
}

insertDepartments();
