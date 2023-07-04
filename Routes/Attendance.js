const express = require("express");
const isTeacher = require("../Middlewares/isTeacher");
const { createAttendance, getAllAttendance, getAttendanceByTeacher } = require("../Controllers/Attendance");
const router = express.Router();

router.get("/", getAllAttendance);

router.get("/token/teacher", isTeacher, getAttendanceByTeacher);

router.post("/create", isTeacher, createAttendance);

module.exports = router