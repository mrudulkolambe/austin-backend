const express = require('express');
const { createChapter, getAllChapters, updateChapter } = require('../Controllers/Chapter');
const router = express.Router();

router.post('/create', createChapter);

router.patch('/:_id', updateChapter);

router.get('/', getAllChapters);

module.exports = router;