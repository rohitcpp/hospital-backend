// routes/patient.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient'); // points to JSON-sending controller
const { protect, authorize } = require('../middleware/authmiddleware');

// Admin + Doctor can view patients
router.get('/', protect, authorize('admin', 'doctor'), patientController.getPatients);

// Admin + Doctor can create patients
router.post('/patient', protect, authorize('admin', 'doctor'), patientController.createPatient);

// Admin + Doctor can update patients
router.put('/:id', protect, authorize('admin', 'doctor'), patientController.updatePatient);

// Admin only can delete patients
router.delete('/:id', protect, authorize('admin'), patientController.deletePatient);

module.exports = router;
