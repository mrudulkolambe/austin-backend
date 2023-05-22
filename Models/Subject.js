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
	chapters: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "CHAPTER"
	}
}, { timestamps: true });


module.exports = mongoose.model("SUBJECT", SUBJECT_SCHEMA);