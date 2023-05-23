const express = require('express');
const { createChapter, getAllChapters, updateChapter, getChaptersBySubjectID } = require('../Controllers/Chapter');
const router = express.Router();

router.post('/create', createChapter);

router.patch('/:_id', updateChapter);

router.get('/', getAllChapters);

router.get('/:subjectID', getChaptersBySubjectID);

module.exports = router;