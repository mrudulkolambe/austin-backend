const express = require('express');
const router = express.Router();
const { createBranch, getBranchById, updateBranch, getAllBranch } = require('../Controllers/Branch');
const emailValidator = require('../Validators/Email');
const canManageBranch = require('../Middlewares/canManageBranch');
const isUser = require('../Middlewares/isUser');

// GET ALL BRANCHES (NO RESTRICTION)
router.get('/', isUser, getAllBranch);

// GET BRANCH BY ID (NO RESTRICTION)
router.get('/:id', isUser, getBranchById);

// CREATE BRANCH (ONLY WHO HAVE ACCESS)
router.post('/create', isUser, createBranch);

// UPDATE  BRANCH (ONLY WHO HAVE ACCESS)
router.patch('/:_id', isUser, updateBranch);

module.exports = router;