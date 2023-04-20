const express = require('express');
const router = express.Router();
const { createBranch, getBranchById, updateBranch, getAllBranch } = require('../Controllers/Branch');
const emailValidator = require('../Validators/Email');

router.get('/all', getAllBranch);

router.get('/:id', getBranchById);

router.post('/create', emailValidator, createBranch);

router.patch('/update', emailValidator, updateBranch);

module.exports = router;