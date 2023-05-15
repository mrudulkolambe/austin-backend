const express = require('express');
const router = express.Router();
const { createSubject, getAllSubjects } = require('../Controllers/Subject');

// GET ALL BRANCHES (NO RESTRICTION)
// router.get('/all', getAllBranch);

// GET BRANCH BY ID (NO RESTRICTION)
router.get('/', getAllSubjects);

// CREATE BRANCH (ONLY WHO HAVE ACCESS)
router.post('/create', createSubject);

// UPDATE  BRANCH (ONLY WHO HAVE ACCESS)
// router.patch('/update', emailValidator, canManageBranch, updateBranch);

module.exports = router;