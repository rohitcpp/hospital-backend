const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  dept: { type: String, required: true, 
    enum:['Cardiology','Neurology','Orthopedics','Pediatrics','Dermatology','Emergency'] }
});

module.exports = mongoose.model("Department", departmentSchema);
