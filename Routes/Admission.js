const express = require('express');
const { getAllAdmissions, getAdmissionById, getAllConfirmedAdmissions, getAllPendingAdmissions, createAdmission, getAdmissionByToken } = require('../Controllers/Admission');
const isStudent = require('../Middlewares/isStudent');
const router = express.Router();

router.post('/create', createAdmission);

router.get('/', getAllAdmissions)

router.get('/student/:_id', getAdmissionById)

router.get('/token', isStudent, getAdmissionByToken)

router.get('/confirm-admission', getAllConfirmedAdmissions)

router.get('/pending-admission', getAllPendingAdmissions)

module.exports = router;