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
	canCreateUsers: {
		type: Boolean,
		required: true,
		default: false
	},
	canManageStudents: {
		type: Boolean,
		required: true,
		default: false
	},
	canManageBranch: {
		type: Boolean,
		required: true,
		default: false
	},
	canCreateBranch: {
		type: Boolean,
		required: true,
		default: false
	},
	canManageBatch: {
		type: Boolean,
		required: true,
		default: false
	},
	canCreateBatch: {
		type: Boolean,
		required: true,
		default: false
	}
})



module.exports = mongoose.model("ROLE", ROLE_SCHEMA);