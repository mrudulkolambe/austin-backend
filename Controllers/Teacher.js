const Teacher = require("../Models/Teacher")
const bcrypt = require('bcrypt')

const createTeacher = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		const newTeacher = new Teacher({ ...req.body, password: hashedPassword });
		const finalTeacher = await newTeacher.save();
		const teacher = await Teacher.findById(finalTeacher._id).populate('subject')
		if (finalTeacher) {
			res.json({ error: false, message: 'Teacher created successfully!', teacher: teacher })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teacher: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teacher: undefined })
	}
}

const updateTeacher = async (req, res) => {
	try {
			const updatedTeacher = await Teacher.findByIdAndUpdate(req.params._id,  req.body, {
				returnOriginal: false
			})
			const teacher = await Teacher.findOne({_id: req.params._id}).populate('subject')
			res.json({ error: false, message: 'Teacher updated successfully!', teacher: teacher })
	} catch (err) {
		res.json({ error: true, message: err.message, teacher: undefined })
	}
}

const getAllTeachers = async (req, res) => {
	try {
		const teachers = await Teacher.find({}, { password: 0 }).populate('subject')
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
		const teachers = await Teacher.find({ isDisabled: true }, {password: 0})
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
		const teachers = await Teacher.find({ isDisabled: false }, {password: 0})
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
		const teachers = await Teacher.find({ salaryType: req.params.salary_type }, {password: 0})
		if (teachers) {
			res.json({ error: false, message: 'Teacher fetched successfully!', teachers: teachers })
		} else {
			res.json({ error: true, message: 'Something went wrong!', teachers: undefined })
		}
	} catch (err) {
		res.json({ error: true, message: err.message, teachers: undefined })
	}
}

const getAllTeachersBySubject = async (req, res) => {
	try {
		const teachers = await Teacher.find({ subject: { $contains: `${req.params.subject}` } }, {password: 0})
	} catch (error) {
		res.json({ error: true, message: err.message, teachers: undefined })
	}
}

module.exports = { createTeacher, getAllTeachers, getAllDisabledTeachers, getAllEnabledTeachers, getAllTeachersBySalaryType, updateTeacher, getAllTeachersBySubject }