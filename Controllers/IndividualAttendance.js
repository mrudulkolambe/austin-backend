const IndividualAttendance = require("../Models/IndividualAttendance");
const IndividualBatch = require("../Models/IndividualBatch");
const IndividualChapterAllocation = require("../Models/IndividualChapterAllocation");

const createAttendance = async (req, res) => {
	try {
		const attendance = new IndividualAttendance({ ...req.body, teacher: req.user._id });
		const newAttendance = await attendance.save()
		const finalAttendance = await IndividualAttendance.findById(newAttendance._id).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" }).populate("individualBatch").populate({
			path: "individualBatch",
			populate: { path: "branch" }
		});
		if (finalAttendance) {
			res.json({ error: false, message: "Attendance Marked Successfully!", attendance: finalAttendance, chapterAllocation: finalChapter, batch: finalBatch })
		} else {
			res.json({ error: true, message: "Something went wrong!", attendance: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, attendance: undefined })
	}
}



const approveAttendance = async (req, res) => {
	try {
		const attendance = await IndividualAttendance.findByIdAndUpdate(req.params._id, {
			approved: true
		}).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("individualBatch").populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" })
		const midChapter = await IndividualChapterAllocation.findOne({ teacher: attendance.teacher._id, chapter: attendance.chapter._id, individualBatch: attendance.individualBatch._id })
		const mainChapter = await IndividualChapterAllocation.findByIdAndUpdate(midChapter._id, {
			$inc: { hoursCompleted: attendance.hours }
		}, {
			returnOriginal: false
		}).populate("teacher").populate("chapter").populate("individualBatch").populate("subject")
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
		const attendance = await IndividualAttendance.find({}).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" }).populate("individualBatch").populate({
			path: "individualBatch",
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
		const attendance = await IndividualAttendance.find({ teacher: req.user._id }).populate({ path: "students", select: "-password" }).populate({ path: "teacher", select: "-password" }).populate("subject").populate("chapter").populate({ path: "allStudents", select: "-password" }).populate("individualBatch");
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