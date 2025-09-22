// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin only can create a doctor
router.post('/', protect, authorize('admin'), doctorController.createDoctor);

// Admin + Doctor can view all doctors
router.get('/', protect, authorize('admin', 'doctor'), doctorController.getDoctors);

// Admin only can update a doctor
router.put('/:id', protect, authorize('admin'), doctorController.updateDoctor);

// Admin only can delete a doctor
router.delete('/:id', protect, authorize('admin'), doctorController.deleteDoctor);

module.exports = router;
