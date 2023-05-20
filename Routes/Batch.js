const express = require('express');
const { createBatch, getAllBatches } = require('../Controllers/Batch');
const router = express.Router();

router.post('/create', createBatch);

router.get('/', getAllBatches);

module.exports = router;