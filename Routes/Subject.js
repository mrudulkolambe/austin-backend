const express = require('express');
const router = express.Router();
const { createSubject, getAllSubjects, deleteSubject } = require('../Controllers/Subject');

router.get('/', getAllSubjects);

router.post('/create', createSubject);

router.delete('/:_id', deleteSubject);

module.exports = router;