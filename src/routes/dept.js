const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');
const { protect, authorize } = require('../middleware/authmiddleware');

//Only Admin can manage departments
router.post('/dept', protect, authorize('admin'), departmentController.createDepartment);

//Everyone (even doctor) can view departments
router.get('/dept', protect, authorize('admin', 'doctor'), departmentController.getDepartments);

module.exports = router;
