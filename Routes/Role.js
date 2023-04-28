const express = require('express');
const router = express.Router();
const { getAllRoles, getRoleById, createRole, manageAccess } = require('../Controllers/Role');
const canManageRoles = require('../Middlewares/canManageRoles');

// GET ALL ROLES (NO RESTRICTION)
router.get('/all', getAllRoles);

// GET ROLE BY ID (NO RESTRICTION)
router.get('/:_id', getRoleById);

// CREATE ROLE (ONLY WHO HAVE ACCESS)
router.post('/create', canManageRoles, createRole);

// UPDATE ROLE (ONLY WHO HAVE ACCESS)
router.patch('/manage', canManageRoles, manageAccess);

module.exports = router;