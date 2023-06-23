const mongoose = require("mongoose");
const {Schema} = mongoose;

const BRANCH_MANAGER_SCHEMA = Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	lastname : {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: "branch-manager"
	},
	phonenumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String, 
		required: true
	},
	isDisabled:{
		type: Boolean,
		default: false
	},
	token:{
		type: String
	}
}, {timestamps: true});

module.exports = mongoose.model("BRANCH-MANAGER", BRANCH_MANAGER_SCHEMA);