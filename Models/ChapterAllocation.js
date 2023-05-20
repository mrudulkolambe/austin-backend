const mongoose = require("mongoose");
const { Schema } = mongoose;

const CHAPTER_ALLOCATION_SCHEMA = new Schema({
	name: {
		type: String,
		required: true
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
	hours: {
		type: Number,
		default: 0,
		required: true
	},
	rate: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('CHAPTER_ALLOCATION', CHAPTER_ALLOCATION_SCHEMA)