const express = require('express');
const { getAllAdmissions, getAdmissionById, getAllConfirmedAdmissions, getAllPendingAdmissions, createAdmission } = require('../Controllers/Admission');
const router = express.Router();

router.post('/create', createAdmission);

router.get('/getAllAdmissions', getAllAdmissions)

router.get('/:_id', getAdmissionById)

router.get('/confirm-admission', getAllConfirmedAdmissions)

router.get('/pending-admission', getAllPendingAdmissions)

module.exports = router;