const express = require("express");
const router = express.Router();
const isBranchManager = require("../Middlewares/isBranchManager")
const { createBranchManager, getAllBranchManagers, updateBranchManager, branchManagerLogin, getBranchManagerByProfileToken } = require("../Controllers/BranchManager");
const isAdmin = require("../Middlewares/isAdmin");
const isUser = require("../Middlewares/isUser");

router.post("/create", isAdmin, createBranchManager);

router.get("/", isUser, getAllBranchManagers);

router.patch("/:_id", isAdmin, updateBranchManager);

router.post("/login", branchManagerLogin);

router.get("/token", isBranchManager, getBranchManagerByProfileToken);

module.exports = router;