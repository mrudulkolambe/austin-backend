const mongoose = require("mongoose");
const { Schema } = mongoose;

const CHAPTER_ALLOCATION_SCHEMA = new Schema({
	name: {
		type: String,
	},
	teacher: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "TEACHER",
		required: true
	},
	chapter: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "CHAPTER",
		required: true
	},
	subject: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "SUBJECT",
		required: true
	},
	batch:{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "BATCH",
	},
	hours: {
		type: Number,
		default: 0,
		required: true
	},
	rate: {
		type: Number,
		required: true
	},
	hoursCompleted: {
		type: Number,
		required: true,
		default: 0
	}
})

module.exports = mongoose.model('CHAPTER_ALLOCATION', CHAPTER_ALLOCATION_SCHEMA)