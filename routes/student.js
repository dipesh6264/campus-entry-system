// routes/student.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:id', studentController.getStudentId);
router.get('/', studentController.getStudent);
router.post('/', studentController.createStudent);

module.exports = router;
