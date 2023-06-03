const express = require('express');
const { createChapterAllocation, getAllChapterAllocation, updateChapterAllocation } = require('../Controllers/ChapterAllocation');
const router = express.Router();

router.get('/', getAllChapterAllocation);
router.post('/create', createChapterAllocation);
router.patch('/:_id', updateChapterAllocation);

module.exports = router;