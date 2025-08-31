const express = require('express');
const { protect, authorize } = require('../middleware/authmiddleware');
const appointmentController = require('../controllers/appointment');

const router = express.Router();

router.post('/appointment', protect, authorize('admin', 'doctor'), appointmentController.createAppointment);
router.get('/appointment', protect, authorize('admin', 'doctor'), appointmentController.getAppointments);

module.exports = router;
