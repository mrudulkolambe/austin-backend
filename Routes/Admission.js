const express = require('express');
const { getAllAdmissions, getAdmissionById, getAllConfirmedAdmissions, getAllPendingAdmissions, createAdmission, getAdmissionByToken, editAdmissions, confirmStudentAdmission } = require('../Controllers/Admission');
const isStudent = require('../Middlewares/isStudent');
const router = express.Router();

router.post('/create', createAdmission);

router.get('/', getAllAdmissions)

router.get('/student/:_id', getAdmissionById)

router.patch('/:_id', editAdmissions)

router.patch('/confirm/:_id', confirmStudentAdmission)

router.get('/token', isStudent, getAdmissionByToken)

router.get('/confirm-admission', getAllConfirmedAdmissions)

router.get('/pending-admission', getAllPendingAdmissions);

module.exports = router;