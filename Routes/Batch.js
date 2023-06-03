const express = require('express');
const { createBatch, getAllBatches, updateBatch, getBatchesByStudentToken } = require('../Controllers/Batch');
const isStudent = require('../Middlewares/isStudent');
const router = express.Router();

router.post('/create', createBatch);

router.get('/', getAllBatches);

router.get('/token/student', isStudent, getBatchesByStudentToken);

router.patch('/:_id', updateBatch);

module.exports = router;