const express = require('express');
const router = express.Router();
const { createBranch, getBranchById, updateBranch, getAllBranch } = require('../Controllers/Branch');
const emailValidator = require('../Validators/Email');
const canManageBranch = require('../Middlewares/canManageBranch');

// GET ALL BRANCHES (NO RESTRICTION)
router.get('/all', getAllBranch);

// GET BRANCH BY ID (NO RESTRICTION)
router.get('/:id', getBranchById);

// CREATE BRANCH (ONLY WHO HAVE ACCESS)
router.post('/create', emailValidator, canManageBranch, createBranch);

// UPDATE  BRANCH (ONLY WHO HAVE ACCESS)
router.patch('/update', emailValidator, canManageBranch, updateBranch);

module.exports = router;