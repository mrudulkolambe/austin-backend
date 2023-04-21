const express = require('express');
const router = express.Router();
const { createBranch, getBranchById, updateBranch, getAllBranch } = require('../Controllers/Branch');
const emailValidator = require('../Validators/Email');
const isAdmin = require('../Middlewares/isAdmin');

router.get('/all', getAllBranch);

router.get('/:id', getBranchById);

router.post('/create', emailValidator, isAdmin, createBranch);

router.patch('/update', emailValidator, isAdmin, updateBranch);

module.exports = router;