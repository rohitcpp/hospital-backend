const Appointment = require('../models/appointment');
const mongoose = require('mongoose');

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { patient, dept, doctor } = req.body;

    // Validate references
    const [patientDoc, deptDoc, doctorDoc] = await Promise.all([
      mongoose.model('Patient').findById(patient),
      mongoose.model('Department').findById(dept),
      mongoose.model('User').findOne({ _id: doctor, role: 'doctor' })
    ]);

    if (!patientDoc) return res.status(400).json({ message: 'Invalid patient ID' });
    if (!deptDoc) return res.status(400).json({ message: 'Invalid department ID' });
    if (!doctorDoc) return res.status(400).json({ message: 'Invalid doctor ID or user is not a doctor' });

    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(400).json({ message: err.message });
  }
};

// Get all appointments with populated fields
const getAppointments = async (req, res) => {
  try {
    // Get the logged-in user's ID and role from req.user (set by protect middleware)
    const { id: userId, role } = req.user;

    // Define the query based on role
    let query = {};
    if (role === 'doctor') {
      query.doctor = userId; // Filter appointments by the logged-in doctor's ID
    }
    // Admins can see all appointments, so no filter is applied for 'admin' role

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name spec')
      .populate('dept', 'dept');

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Server error while fetching appointments', error: err.message });
  }
};

// Get a single appointment by ID with populated fields
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name email')
      .populate('doctor', 'name spec')
      .populate('dept', 'dept');

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    res.json(appointment);
  } catch (err) {
    console.error('Error fetching appointment by ID:', err);
    res.status(500).json({ message: 'Server error while fetching appointment', error: err.message });
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  try {
    const { patient, dept, doctor } = req.body;

    // Validate references if provided
    if (patient || dept || doctor) {
      const checks = [];
      if (patient) checks.push(mongoose.model('Patient').findById(patient));
      if (dept) checks.push(mongoose.model('Department').findById(dept));
      if (doctor) checks.push(mongoose.model('User').findOne({ _id: doctor, role: 'doctor' }));

      const [patientDoc, deptDoc, doctorDoc] = await Promise.all(checks);

      if (patient && !patientDoc) return res.status(400).json({ message: 'Invalid patient ID' });
      if (dept && !deptDoc) return res.status(400).json({ message: 'Invalid department ID' });
      if (doctor && !doctorDoc) return res.status(400).json({ message: 'Invalid doctor ID or user is not a doctor' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });

    res.json(updatedAppointment);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(400).json({ message: err.message });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};