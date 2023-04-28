const Role = require("../Models/Role");


const createRole = async (req, res) => {
	try {
		const newRole = new Role(req.body);
		const role = await newRole.save();
		if (!role) return
		return res.json({ error: false, message: "Role Created Successfully!", role: role })
	} catch (error) {
		return res.json({ error: true, error: error.message, branch: undefined })
	}
}

const manageAccess = async (req, res) => {
	try {
		const newRole = new Role(req.body);
		const role = await newRole.save();
		if (!role) return
		return res.json({ error: false, message: "Role Created Successfully!", role: role })
	} catch (error) {
		return res.json({ error: true, error: error.message, role: undefined })
	}
}

const getAllRoles = async (req, res) => {
	try {
		const roles = await Role.find({});
		if (!roles) return
		return res.json({ error: false, message: "Roles fetched successfully!", roles: roles })
	} catch (error) {
		return res.json({ error: true, error: error.message, roles: undefined })
	}
}

const getRoleById = async (req, res) => {
	try {
		const role = Role.findById(req.params._id);
		if (!role) return
		return res.json({ error: false, message: "Role fetched successfully!", role: role })
	} catch (error) {
		return res.json({ error: true, error: error.message, roles: undefined })
	}
}
module.exports = { createRole, manageAccess, getAllRoles, getRoleById };