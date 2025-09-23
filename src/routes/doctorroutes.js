const express = require('express'); // Must be express
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin creates doctor
router.post('/', protect, authorize('admin'), doctorController.createDoctor);

// Admin or doctor gets list of doctors
router.get('/', protect, authorize('admin', 'doctor'), doctorController.getDoctors);

// Admin updates doctor info
router.put('/:id', protect, authorize('admin'), doctorController.updateDoctor);

// Doctor changes own password
//router.put('/change-password', protect, authorize('doctor'), doctorController.changePassword);

// Admin deletes doctor
router.delete('/:id', protect, authorize('admin'), doctorController.deleteDoctor);

module.exports = router;
