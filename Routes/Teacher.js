const express = require('express');
const { createTeacher, getAllTeachers, getAllEnabledTeachers, getAllDisabledTeachers, getAllTeachersBySalaryType, updateTeacher, getAllTeachersBySubject, getTeacherByToken } = require('../Controllers/Teacher');
const router = express.Router();
const isTeacher =  require("../Middlewares/isTeacher")

router.post('/create', createTeacher);

router.patch('/:_id', updateTeacher);

router.get('/token', isTeacher, getTeacherByToken)

router.get('/', getAllTeachers);

router.get('/enabled', getAllEnabledTeachers);

router.get('/disabled', getAllDisabledTeachers);

router.get('/salary/:salary_type', getAllTeachersBySalaryType);

router.get('/subject/:subject', getAllTeachersBySubject);

module.exports = router;