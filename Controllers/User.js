const User = require("../Models/User");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const AdmissionForm = require("../Models/AdmissionForm");
const Teacher = require("../Models/Teacher");


const handleSignUp = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = new User({ ...req.body, password: hashedPassword })
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const newUser = await user.save();
			const accessToken = jwt.sign({ id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET)
			res.json({ error: false, message: "Account Created Successfully!", token: accessToken })
		} else {
			res.json({ error: true, error: errors, token: undefined })
		}

	} catch (err) {
		res.json({ error: true, error: err.message, token: undefined })
	}
}

const handleSignIn = async (req, res) => {
	const user = await User.findOne({ username: req.body.username })
	if (!user) {
		res.json({ error: true, error: "Cannot find user", token: undefined })
	} else {
		try {
			if (await bcrypt.compare(req.body.password, user.password)) {
				const accessToken = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
				res.json({ error: false, message: "Logged In Successfully!", token: accessToken })
			} else {
				res.json({ error: true, message: "Invalid Credentials", token: undefined })
			}
		} catch (error) {
			res.json({ error: true, error: error.message, token: undefined })
		}
	}
}

const handleStudentSignIn = async (req, res) => {
	try {
		const student = await AdmissionForm.findOne({ username: req.body.username });
		if (!student) {
			res.json({ error: true, message: "Cannot find user", token: undefined })
		} else {
			if (student?.confirmed && !student.isDisabled) {
				if (await bcrypt.compare(req.body.password, student.password)) {
					const accessToken = jwt.sign({ _id: student._id, role: "student" }, process.env.JWT_SECRET)
					res.json({ error: false, message: "Logged In Successfully!", token: accessToken })
				} else {
					res.json({ error: true, message: "Invalid Credentials", token: undefined })
				}
			} else if (student?.isDisabled) {
				res.json({ error: true, message: "Your account has beed disabled by the admin", token: undefined })
			} else {
				res.json({ error: true, message: "Contact your admin", token: undefined })
			}
		}
	} catch (error) {

	}
}

const handleTeacherSignIn = async (req, res) => {
	const user = await Teacher.findOne({ username: req.body.username })
	if (!user) {
		res.json({ error: true, error: "Cannot find user", token: undefined })
	} else {
		try {
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				if (await bcrypt.compare(req.body.password, user.password)) {
					const accessToken = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
					res.json({ error: false, message: "Logged In Successfully!", token: accessToken })
				} else {
					res.json({ error: true, message: "Invalid Credentials", token: undefined })
				}
			} else {
				res.json({ error: true, error: errors, token: undefined })
			}
		} catch (error) {
			res.json({ error: true, error: error.message, token: undefined })
		}
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate("role");
		if (users) {
			res.json({ error: false, message: "Users fetched successfully!", users: users });
		} else {
			res.json({ error: true, message: "Something went wrong!", users: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, users: undefined });
	}
}

module.exports = { handleSignUp, handleSignIn, handleStudentSignIn, getAllUsers, handleTeacherSignIn }
