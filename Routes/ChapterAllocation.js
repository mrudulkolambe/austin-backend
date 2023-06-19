const express = require('express');
const { createChapterAllocation, getAllChapterAllocation, updateChapterAllocation, getAllChapterAllocationByToken } = require('../Controllers/ChapterAllocation');
const isTeacher = require('../Middlewares/isTeacher');
const router = express.Router();

router.get('/', getAllChapterAllocation);
router.get('/teacher', isTeacher, getAllChapterAllocationByToken);
router.post('/create', createChapterAllocation);
router.patch('/:_id', updateChapterAllocation);

module.exports = router;