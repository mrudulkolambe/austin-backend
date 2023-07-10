const express = require('express');
const { createChapterAllocation, getAllChapterAllocation, updateChapterAllocation, getAllChapterAllocationByToken } = require('../Controllers/ChapterAllocation');
const isTeacher = require('../Middlewares/isTeacher');
const isUser = require('../Middlewares/isUser');
const router = express.Router();

router.get('/', isUser, getAllChapterAllocation);

router.get('/teacher', isTeacher, getAllChapterAllocationByToken);

router.post('/create', isUser, createChapterAllocation);

router.patch('/:_id', isUser, updateChapterAllocation);

module.exports = router;