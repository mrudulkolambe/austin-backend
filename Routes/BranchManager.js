const express = require("express");
const router = express.Router();
const isBranchManager = require("../Middlewares/isBranchManager")
const { createBranchManager, getAllBranchManagers, updateBranchManager, branchManagerLogin, getBranchManagerByProfileToken } = require("../Controllers/BranchManager")

router.post("/create", createBranchManager);

router.get("/", getAllBranchManagers);

router.patch("/:_id", updateBranchManager);

router.post("/login", branchManagerLogin);

router.get("/token", isBranchManager, getBranchManagerByProfileToken);

module.exports = router;