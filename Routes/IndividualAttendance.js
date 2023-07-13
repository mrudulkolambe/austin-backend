const express = require("express");
const isTeacher = require("../Middlewares/isTeacher");
const { createAttendance, getAllAttendance, getAttendanceByTeacher, approveAttendance } = require("../Controllers/IndividualAttendance");
const isUser = require("../Middlewares/isUser");
const router = express.Router();

router.get("/", isUser, getAllAttendance);

router.get("/token/teacher", isTeacher, getAttendanceByTeacher);

router.post("/create", isTeacher, createAttendance);

router.patch("/approve/:_id", isUser, approveAttendance);

module.exports = router