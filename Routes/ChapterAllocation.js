const express = require('express');
const { createChapterAllocation } = require('../Controllers/ChapterAllocation');
const router = express.Router();

router.post('/create', createChapterAllocation);

module.exports = router;