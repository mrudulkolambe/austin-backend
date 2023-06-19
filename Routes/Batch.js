const express = require('express');
const { createBatch, getAllBatches, updateBatch, getBatchesByStudentToken, getBatchesByTeacherToken } = require('../Controllers/Batch');
const isStudent = require('../Middlewares/isStudent');
const isTeacher = require('../Middlewares/isTeacher');
const router = express.Router();

router.post('/create', createBatch);

router.get('/', getAllBatches);

router.get('/token/student', isStudent, getBatchesByStudentToken);

router.get('/token/teacher', isTeacher, getBatchesByTeacherToken);

router.patch('/:_id', updateBatch);

module.exports = router;