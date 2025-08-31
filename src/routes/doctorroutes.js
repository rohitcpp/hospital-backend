const express = require('express');
const { protect, authorize } = require('../middleware/authmiddleware');
const doctorController = require('../controllers/doctor');

const router = express.Router();

router.post('/doctor', protect, authorize('admin'), doctorController.createDoctor);
router.get('/doctor', protect, authorize('admin', 'doctor'), doctorController.getDoctors);

module.exports = router;
