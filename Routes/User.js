const express = require("express");
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { handleSignUp, handleSignIn } = require("../Controllers/User");
const emailValidator = require("../Validators/Email");
const passwordValidator = require("../Validators/Password");
const canManageUsers = require("../Middlewares/canManageUsers");

// CREATE ACCOUNT (ONLY WHO HAVE ACCESS)
router.post('/signup', emailValidator, passwordValidator, canManageUsers, handleSignUp)

// LOGIN ACCOUNT (NO RESTRICTION)
router.post('/signin', passwordValidator, handleSignIn)

router.patch('/reset-password', async (req, res) => {
	const user = await User.findOne({ username: req.body.username })
	if (!user) {
		return res.status(404).send({ message: "Cannot find user!" });
	} else {
		try {
			const newHashedPassword = await bcrypt.hash(req.body.password, 10);
			await User.findByIdAndUpdate(user._id, { password: newHashedPassword }, {
				returnOriginal: false
			})
			res.send({ message: "Password Reset Successfully!" })
		} catch (error) {
			res.send(error)
		}
	}
})

// UPDATE USER (ONLY WHO HAVE ACCESS) & (THAT PARTICULAR USER)
router.patch('/update', canManageUsers, async (req, res) => {
	const user = await User.findOne({ username: req.body.username })
	if (!user) {
		return res.status(404).send({ message: "Cannot find user!" });
	} else {
		try {
			const userUpdate = await User.findByIdAndUpdate(user._id, req.body, {
				returnOriginal: false
			})
			res.send(userUpdate)
		} catch (error) {
			res.send(error)
		}
	}
})

module.exports = router;