const express = require('express');
const { protect, authorize } = require('../middleware/authmiddleware');
const appointmentController = require('../controllers/aptcontrol');

const router = express.Router();

// CREATE a new appointment
router.post(
  '/',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.createAppointment
);

// GET all appointments
router.get(
  '/',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.getAppointments
);

// GET a single appointment by ID
router.get(
  '/:id',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.getAppointmentById
);

// UPDATE an appointment by ID
router.put(
  '/:id',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.updateAppointment
);

// DELETE an appointment by ID
router.delete(
  '/:id',
  protect,
  authorize('admin', 'doctor'),
  appointmentController.deleteAppointment
);

module.exports = router;
