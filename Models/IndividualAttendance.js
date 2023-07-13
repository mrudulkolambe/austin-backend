const mongoose = require('mongoose');
const { Schema } = mongoose;

const ATTENDANCE_SCHEMA = new Schema({
	individualBatch: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "INDIVIDUAL-BATCH"
	},
	date: {
		type: Number,
	},
	subject: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "SUBJECT"
	},
	chapter: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "CHAPTER"
	},
	startTime: {
		type: Number
	},
	endTime: {
		type: Number
	},
	teacher: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "TEACHER"
	},
	students: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "ADMISSION",
	},
	allStudents: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "ADMISSION"
	},
	hours: {
		type: Number
	},
	approved: {
		type: Boolean,
		required: true,
		default: false
	}
}, { timestamps: true });


module.exports = mongoose.model("INDIVIDUAL-ATTENDANCE", ATTENDANCE_SCHEMA);