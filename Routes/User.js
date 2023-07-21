const express = require("express");
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { handleSignUp, handleSignIn,handleTeacherSignIn, handleStudentSignIn, getAllUsers, resetPassword } = require("../Controllers/User");
const emailValidator = require("../Validators/Email");
const passwordValidator = require("../Validators/Password");
const canManageUsers = require("../Middlewares/canManageUsers");
const passwordMiddleware = require("../Middlewares/PasswordMiddleware");

// CREATE ACCOUNT (ONLY WHO HAVE ACCESS)
router.post('/signup', emailValidator, passwordValidator, handleSignUp)

// LOGIN ACCOUNT (NO RESTRICTION)
router.post('/signin/student', handleStudentSignIn)
router.post('/signin/teacher', handleTeacherSignIn)
router.post('/signin', handleSignIn);

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

router.get("/", getAllUsers);

router.patch('/reset-password', passwordMiddleware, resetPassword);

module.exports = router;