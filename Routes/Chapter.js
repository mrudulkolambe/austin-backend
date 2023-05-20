const express = require('express');
const { createChapter, getAllChapters } = require('../Controllers/Chapter');
const router = express.Router();

router.post('/create', createChapter);

router.get('/', getAllChapters);

module.exports = router;