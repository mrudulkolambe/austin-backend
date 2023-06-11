const express = require("express");
const router = express.Router()
const { setPasswordEmail } = require("../Controllers/Email")

router.post("/set-password", setPasswordEmail)

module.exports = router;