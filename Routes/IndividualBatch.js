const express = require('express');
const { createBatch, getAllBatches, updateBatch, getBatchesByStudentToken, getBatchesByTeacherToken } = require('../Controllers/IndividualBatch');
const isStudent = require('../Middlewares/isStudent');
const isTeacher = require('../Middlewares/isTeacher');
const isUser = require('../Middlewares/isUser');
const router = express.Router();

router.post('/create', isUser, createBatch);

router.get('/', isUser, getAllBatches);

router.get('/token/student', isStudent, getBatchesByStudentToken);

router.get('/token/teacher', isTeacher, getBatchesByTeacherToken);

router.patch('/:_id', isUser, updateBatch);

module.exports = router;