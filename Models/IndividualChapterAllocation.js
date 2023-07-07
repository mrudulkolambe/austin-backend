const mongoose = require("mongoose");
const { Schema } = mongoose;

const INDIVIDUAL_CHAPTER_ALLOCATION_SCHEMA = new Schema({
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
	individualBatch: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "INDIVIDUAL-BATCH",
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

module.exports = mongoose.model('INDIVIDUAL_CHAPTER_ALLOCATION', INDIVIDUAL_CHAPTER_ALLOCATION_SCHEMA)