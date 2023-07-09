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
		const midChapter = await IndividualChapterAllocation.findOneAndUpdate({ teacher: newAttendance.teacher, chapter: newAttendance.chapter, individualBatch: newAttendance.individualBatch }, {
			$inc: { hoursCompleted: req.body.hours }
		}, {
			returnOriginal: false
		}).populate("teacher").populate("chapter").populate("subject").populate("individualBatch");
		const finalChapter = await IndividualChapterAllocation.findById(midChapter._id).populate("teacher").populate("chapter").populate("subject").populate("individualBatch");
		const midBatch = await IndividualBatch.findOneAndUpdate({ _id: newAttendance.individualBatch }, {
			$inc: { hours: - req.body.hours }
		}, {
			returnOriginal: false
		})
		const finalBatch = await IndividualBatch.findOne({ _id: midBatch._id }).populate("branch").populate("course").populate("students")
		if (finalAttendance) {
			res.json({ error: false, message: "Attendance Marked Successfully!", attendance: finalAttendance, chapterAllocation: finalChapter, batch: finalBatch })
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

module.exports = { createAttendance, getAllAttendance, getAttendanceByTeacher }