const express = require('express');
const { createTeacher, getAllTeachers, getAllEnabledTeachers, getAllDisabledTeachers, getAllTeachersBySalaryType, updateTeacher, getAllTeachersBySubject } = require('../Controllers/Teacher');
const router = express.Router();

router.post('/create', createTeacher);

router.patch('/:_id', updateTeacher);

router.get('/', getAllTeachers);

router.get('/enabled', getAllEnabledTeachers);

router.get('/disabled', getAllDisabledTeachers);

router.get('/salary/:salary_type', getAllTeachersBySalaryType);

router.get('/subject/:subject', getAllTeachersBySubject);

module.exports = router;