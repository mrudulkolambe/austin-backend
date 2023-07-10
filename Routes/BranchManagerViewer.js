const express = require("express");
const router = express.Router();
const isBranchManagerViewer = require("../Middlewares/isBranchManagerViewer")
const { createBranchManager, getAllBranchManagers, updateBranchManager, branchManagerLogin, getBranchManagerByProfileToken } = require("../Controllers/BranchManagerViewer");
const isAdmin = require("../Middlewares/isAdmin");
const isUser = require("../Middlewares/isUser");

router.post("/create", isAdmin, createBranchManager);

router.get("/", isUser, getAllBranchManagers);

router.patch("/:_id", isAdmin, updateBranchManager);

router.post("/login", branchManagerLogin);

router.get("/token", isBranchManagerViewer, getBranchManagerByProfileToken);

module.exports = router;