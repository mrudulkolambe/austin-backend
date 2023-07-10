const express = require('express');
const { createChapter, getAllChapters, updateChapter, getChaptersBySubjectID } = require('../Controllers/Chapter');
const isUser = require('../Middlewares/isUser');
const router = express.Router();

router.post('/create', isUser, createChapter);

router.patch('/:_id', isUser, updateChapter);

router.get('/', isUser, getAllChapters);

router.get('/:subjectID', isUser, getChaptersBySubjectID);

module.exports = router;