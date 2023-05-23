const Course = require("../Models/Course")


const createCourse = async (req, res) => {
	try {
		const newCourse = new Course(req.body);
		const finalCourse = await newCourse.save();
		const course = await Course.findOne({_id: finalCourse._id}).populate('subjects')
		if (course) {
			res.json({ error: false, message: "Course created successfully!", course: course })
		} else {
			res.json({ error: true, message: "Something went wrong!", course: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, course: undefined })
	}
}

const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find({}).populate('subjects');
		if (courses) {
			res.json({ error: false, message: "Courses fetched successfully!", courses: courses })
		} else {
			res.json({ error: true, message: "Something went wrong!", course: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, course: undefined })
	}
}

module.exports = { createCourse, getAllCourses }