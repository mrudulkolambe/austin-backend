const express = require("express");
const router = express.Router()
const { setPasswordEmail, resetPasswordEmail } = require("../Controllers/Email")

router.post("/set-password", setPasswordEmail)

router.post("/reset-password", resetPasswordEmail)

module.exports = router;