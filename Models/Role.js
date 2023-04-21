const mongoose = require('mongoose');
const { Schema } = mongoose;


const ROLE_SCHEMA = new Schema({
	role: {
		type: String,
		required: true
	},
	canReadStudents:{
		type: Boolean,
		required: true
	},
	canManageStudents:{
		type: Boolean,
		required: true
	},
	canReadBranch:{
		type: Boolean,
		required: true
	},
	canManageBranch: {
		type: Boolean,
		required: true
	},
	canReadBatch: {
		type: Boolean,
		required: true
	},
	canManageBatch: {
		type: Boolean,
		required: true
	}
})



module.exports = mongoose.model("ROLE", ROLE_SCHEMA);