const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')   
      .populate('doctor', 'name specialty'); 
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createAppointment, getAppointments };
