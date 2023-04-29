const mongoose = require('mongoose');
const { Schema } = mongoose;

const SUBJECT_SCHEMA = new Schema({
	name: {
		type: String,
		required: true
	},
	grade: {
		type: String,
		required: true,
	},
}, { timestamps: true });


module.exports = mongoose.model("SUBJECT", SUBJECT_SCHEMA);