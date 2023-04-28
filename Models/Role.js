const mongoose = require('mongoose');
const { Schema } = mongoose;


const ROLE_SCHEMA = new Schema({
	role: {
		type: String,
		required: true,
	},
	canManageUsers: {
		type: Boolean,
		required: true,
		default: false
	},
	canManageStudents:{
		type: Boolean,
		required: true,
		default: false
	},
	canManageBranch: {
		type: Boolean,
		required: true,
		default: false
	},
	canManageBatch: {
		type: Boolean,
		required: true,
		default: false
	},
	canManageRoles: {
		type: Boolean,
		required: true,
		default: false
	}
})



module.exports = mongoose.model("ROLE", ROLE_SCHEMA);