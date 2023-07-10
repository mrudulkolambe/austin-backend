const express = require("express");
const isTeacher = require("../Middlewares/isTeacher");
const { createAttendance, getAllAttendance, getAttendanceByTeacher } = require("../Controllers/IndividualAttendance");
const isUser = require("../Middlewares/isUser");
const router = express.Router();

router.get("/", isUser, getAllAttendance);

router.get("/token/teacher", isTeacher, getAttendanceByTeacher);

router.post("/create", isTeacher, createAttendance);

module.exports = router