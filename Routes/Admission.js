const express = require('express');
const { getAllAdmissions, getAdmissionById, getAllConfirmedAdmissions, getAllPendingAdmissions, createAdmission, getAdmissionByToken, editAdmissions, confirmStudentAdmission, handleIsDisabled, resetPassword } = require('../Controllers/Admission');
const isStudent = require('../Middlewares/isStudent');
const passwordMiddleware = require('../Middlewares/PasswordMiddleware');
const isUser = require('../Middlewares/isUser');
const router = express.Router();

router.post('/create', createAdmission);

router.get('/', isUser, getAllAdmissions)

router.get('/student/:_id', isUser, getAdmissionById)

router.patch('/:_id', isUser, editAdmissions)

router.patch('/confirm/:_id', isUser, confirmStudentAdmission)

router.patch('/disabled/:_id', isUser, handleIsDisabled)

router.get('/token', isStudent, getAdmissionByToken)

router.get('/confirm-admission', getAllConfirmedAdmissions)

router.get('/pending-admission', getAllPendingAdmissions);

module.exports = router;