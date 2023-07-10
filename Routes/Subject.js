const express = require('express');
const router = express.Router();
const { createSubject, getAllSubjects, deleteSubject, updateSubject } = require('../Controllers/Subject');
const isUser = require('../Middlewares/isUser');

router.get('/', isUser, getAllSubjects);

router.post('/create', isUser, createSubject);

router.patch('/:_id', isUser, updateSubject);

router.delete('/:_id', isUser, deleteSubject);

module.exports = router;