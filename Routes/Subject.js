const express = require('express');
const router = express.Router();
const { createSubject, getAllSubjects, deleteSubject, updateSubject } = require('../Controllers/Subject');

router.get('/', getAllSubjects);

router.post('/create', createSubject);

router.patch('/:_id', updateSubject);

router.delete('/:_id', deleteSubject);

module.exports = router;