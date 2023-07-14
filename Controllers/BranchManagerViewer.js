const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const BranchManagerViewer = require("../Models/BranchManagerViewer");

const createBranchManager = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		const branchManager = await new BranchManagerViewer({
			...req.body, password: hashedPassword
		});
		const finalBranchManager = await branchManager.save()
		if (finalBranchManager) {
			res.json({ error: false, message: "Branch Manager Created successfully!", user: finalBranchManager })
		} else {
			res.json({ error: true, message: "Something went wrong!", user: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, user: undefined })
	}
}

const getAllBranchManagers = async (req, res) => {
	try {
		const branchManagers = await BranchManagerViewer.find({});
		if (branchManagers) {
			res.json({ error: false, message: "Branch Managers fetched successfully!", users: branchManagers })
		} else {
			res.json({ error: true, message: "Something went wrong!", users: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, users: undefined })
	}
}

const getBranchManagerByProfileToken = async (req, res) => {
	try {
		const branchManager = await BranchManagerViewer.findById(req.user._id);
		if (branchManager) {
			res.json({ error: false, message: "Branch Manager fetched successfully!", user: branchManager })
		} else {
			res.json({ error: true, message: "Something went wrong!", user: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, user: undefined })
	}
}

const updateBranchManager = async (req, res) => {
	try {
		const updatedBranchManager = await BranchManagerViewer.findByIdAndUpdate(req.params._id, { isDisabled: req.body.isDisabled, username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phonenumber: req.body.phonenumber }, {
			returnOriginal: false
		})
		const branchManager = await BranchManagerViewer.findOne({ _id: req.params._id })
		res.json({ error: false, message: 'Branch Manager updated successfully!', user: branchManager })
	} catch (err) {
		res.json({ error: true, message: err.message, teacher: undefined })
	}
}

const branchManagerLogin = async (req, res) => {
	try {
		const user = await BranchManagerViewer.findOne({ username: req.body.username });
		if (user) {
			if (user.isDisabled) {
				res.json({ error: true, message: "This account is disabled by admin, Please contact your admin", token: undefined })
			} else {
				if (await bcrypt.compare(req.body.password, user.password)) {
					const token = jwt.sign({ _id: user._id, role: user.role }, `${process.env.JWT_SECRET}`);
					res.json({ error: false, message: "Logged In successfully!", token: token })
				} else {
					res.json({ error: true, message: "Invalid Credentials", token: undefined })
				}
			}
		} else {
			res.json({ error: true, message: "User not found!", token: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, token: undefined })
	}
}

module.exports = {
	createBranchManager,
	getAllBranchManagers,
	updateBranchManager,
	branchManagerLogin,
	getBranchManagerByProfileToken
}