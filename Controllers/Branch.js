const Branch = require("../Models/Branch");
const { validationResult } = require("express-validator");


const getAllBranch = async (req, res) => {
	try {
		const branches = await Branch.find({}).populate("manager").populate("viewer");
		if (branches) {
			res.json({ error: false, message: "Branch Fetched Successfully!", branches: branches })
		} else {
			res.json({ error: false, message: "No data available", branches: [] })
		}
	} catch (error) {
		res.json({ error: true, error: error.message, branches: undefined })
	}
}

const getBranchById = async (req, res) => {
	try {
		const branch = await Branch.findById(req.params._id).populate("manager").populate("viewer");
		if (branch) {
			res.json({ error: false, message: "Branch Fetched Successfully!", branch: branch })
		} else {
			res.json({ error: false, message: "No branch found", branch: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, branch: undefined })
	}
}

const createBranch = async (req, res) => {
	try {
		const branch = new Branch(req.body);
		const newBranch = await branch.save()
		const finalBranch = await Branch.findById(newBranch._id).populate("manager").populate("viewer");
		if (finalBranch) {
			res.json({ error: false, message: "Branch Created Successfully!", branch: finalBranch })
		} else {
			res.json({ error: true, message: "Something went wrong", branch: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, branch: undefined })
	}
}

const updateBranch = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const branch = await Branch.findByIdAndUpdate(req.params._id, req.body, { returnOriginal: false }).populate("manager").populate("viewer")
			res.json({ error: false, message: "Branch Updated Successfully!", branch: branch })
		} else {
			res.json({ error: true, error: errors.array(), branch: undefined })
		}
	} catch (error) {
		res.json({ error: true, error: error.message, branch: undefined })
	}
}

module.exports = { getAllBranch, getBranchById, createBranch, updateBranch };