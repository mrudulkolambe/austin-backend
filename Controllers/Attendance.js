const Attendance = require("../Models/Attendance")

const createAttendance = async (req, res) => {
	try {
		const attendance = new Attendance({ ...req.body, teacher: req.user._id });
		const newAttendance = await attendance.save()
		const finalAttendance = await Attendance.findById(newAttendance._id).populate("students").populate("teacher").populate("batch").populate("subject").populate("chapter")
		if (finalAttendance) {
			res.json({ error: false, message: "Attendance Marked Successfully!", attendance: finalAttendance })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}

const getAllAttendance = async (req, res) => {
	try {
		const attendance = await Attendance.find({}).populate("students").populate("teacher").populate("batch").populate("subject").populate("chapter")
		if (attendance) {
			res.json({ error: false, message: "Attendance fetched successfully!", attendance: attendance })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}

const getAttendanceByTeacher = async (req, res) => {
	try {
		const attendance = await Attendance.find({ teacher: req.user._id }).populate("students").populate("teacher").populate("batch").populate("subject").populate("chapter")
		if (attendance) {
			res.json({ error: false, message: "Attendance fetched successfully!", attendance: attendance })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}

module.exports = { createAttendance, getAllAttendance, getAttendanceByTeacher }