const express = require('express');
const { createTeacher, getAllTeachers, getAllEnabledTeachers, getAllDisabledTeachers, updateTeacher, getAllTeachersBySubject, getTeacherByToken } = require('../Controllers/Teacher');
const router = express.Router();
const isTeacher = require("../Middlewares/isTeacher");
const isUser = require('../Middlewares/isUser');

router.post('/create', isUser, createTeacher);

router.patch('/:_id', isUser, updateTeacher);

router.get('/token', isTeacher, getTeacherByToken)

router.get('/', isUser, getAllTeachers);

router.get('/enabled', getAllEnabledTeachers);

router.get('/disabled', getAllDisabledTeachers);

router.get('/subject/:subject', getAllTeachersBySubject);

module.exports = router;