const mongoose = require('mongoose');
const { Schema } = mongoose;

const CHAPTER_SCHEMA = new Schema({
	name: {
		type: String,
		required: true
	},
	hours:{
		type: Number,
		required: true
	},
	grade: {
		type: String,
		required: true
	},
	subjectID: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "SUBJECT"
	}
}, { timestamps: true });


module.exports = mongoose.model("CHAPTER", CHAPTER_SCHEMA);