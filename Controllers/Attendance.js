const Attendance = require("../Models/Attendance");
const ChapterAllocation = require("../Models/ChapterAllocation");

const createAttendance = async (req, res) => {
	try {
		const attendance = new Attendance({ ...req.body, teacher: req.user._id });
		const newAttendance = await attendance.save()
		const finalAttendance = await Attendance.findById(newAttendance._id).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("batch").populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" })
		if (finalAttendance) {
			res.json({ error: false, message: "Attendance Marked Successfully!", attendance: finalAttendance })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}

const approveAttendance = async (req, res) => {
	try {
		const attendance = await Attendance.findByIdAndUpdate(req.params._id, {
			approved: true
		}).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("batch").populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" })
		const midChapter = await ChapterAllocation.findOne({ teacher: attendance.teacher._id, chapter: attendance.chapter._id, batch: attendance.batch._id })
		const mainChapter = await ChapterAllocation.findByIdAndUpdate(midChapter._id, {
			$inc: { hoursCompleted:  attendance.hours}
		}, {
			returnOriginal: false
		}).populate("teacher").populate("chapter").populate("batch").populate("subject")
		if (attendance) {
			res.json({ error: false, message: "Attendance Marked Successfully!", attendance: attendance, chapterAllocation: mainChapter })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}

const getAllAttendance = async (req, res) => {
	try {
		const attendance = await Attendance.find({}).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("batch").populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" }).populate({
			path: "batch",
			populate: { path: "branch" }
		});
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
		const attendance = await Attendance.find({ teacher: req.user._id }).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("batch").populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" })
		if (attendance) {
			res.json({ error: false, message: "Attendance fetched successfully!", attendance: attendance })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}

module.exports = { createAttendance, getAllAttendance, getAttendanceByTeacher, approveAttendance }