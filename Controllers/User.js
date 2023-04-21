const User = require("../Models/User");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');


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
			const errors = validationResult(req);
			if (errors.isEmpty()) {
				if (bcrypt.compare(req.body.password, user.password)) {
					const accessToken = jwt.sign({ _id: user._id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET)
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
module.exports = { handleSignUp, handleSignIn }