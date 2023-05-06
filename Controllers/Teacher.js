const Teacher = require("../Models/Teacher")

const createTeacher = async (req, res) => {
	try {
		const newTeacher = new Teacher(req.body);
		const finalTeacher = await newTeacher.save()
		if (finalTeacher) {
			res.json({ error: false, message: 'Teacher created successfully!', teacher: finalTeacher })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teacher: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teacher: undefined })
	}
}

const updateTeacher = async (req, res) => {
	try {
		const teacher = await Teacher.findById(req.params._id)
		if (teacher) {
			const updatedTeacher = await Teacher.findByIdAndUpdate(teacher._id, req.body, {
				returnOriginal: false
			})
			res.json({ error: false, message: 'Teacher updated successfully!', teacher: updatedTeacher })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teacher: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teacher: undefined })
	}
}

const getAllTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.find({})
		if (teachers) {
			res.json({ error: false, message: 'Teacher fetched successfully!', teachers: teachers })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teachers: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teachers: undefined })
	}
}

const getAllDisabledTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.find({ isDisabled: true })
		if (teachers) {
			res.json({ error: false, message: 'Teacher fetched successfully!', teachers: teachers })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teachers: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teachers: undefined })
	}
}

const getAllEnabledTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.find({ isDisabled: false })
		if (teachers) {
			res.json({ error: false, message: 'Teacher fetched successfully!', teachers: teachers })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teachers: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teachers: undefined })
	}
}

const getAllTeachersBySalaryType = async (req, res) => {
	try {
		const teachers = await Teacher.find({ salaryType: req.params.salary_type })
		if (teachers) {
			res.json({ error: false, message: 'Teacher fetched successfully!', teachers: teachers })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teachers: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teachers: undefined })
	}
}

module.exports = { createTeacher, getAllTeachers, getAllDisabledTeachers, getAllEnabledTeachers, getAllTeachersBySalaryType, updateTeacher }