const mongoose = require('mongoose');
const { Schema } = mongoose;

const BRANCH_SCHEMA = new Schema({
	name: {
		type: String,
		required: true
	},
	addressline: {
		type: String,
		required: true
	},
	street: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	pincode: {
		type: String,
		required: true
	},
	landmark: {
		type: String,
		required: false
	},
	branch_logo: {
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	manager: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "BRANCH-MANAGER",
		required: true
	}
}, { timestamps: true });


module.exports = mongoose.model("BRANCH", BRANCH_SCHEMA);