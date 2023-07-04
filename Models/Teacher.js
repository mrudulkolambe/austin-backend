const mongoose = require('mongoose');
const { Schema } = mongoose;


const TEACHER_SCHEMA = new Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'teacher'
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	isDisabled: {
		type: Boolean,
		required: true,
		default: false
	},
	// canUpdateTimetable: {
	// 	type: Boolean,
	// 	required: true,
	// 	default: true
	// },
	subject: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: 'SUBJECT'
	},
	token: {
		type: String
	}
})



module.exports = mongoose.model("TEACHER", TEACHER_SCHEMA);