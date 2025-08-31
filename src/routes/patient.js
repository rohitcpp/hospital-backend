const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient');
const { protect, authorize } = require('../middleware/authmiddleware');

//Admin + Doctor can view patients
router.get('/patient', protect, authorize('admin', 'doctor'), patientController.getPatients);

//Admin + Doctor can create patients
router.post('/patient', protect, authorize('admin', 'doctor'), patientController.createPatient);

module.exports = router;
