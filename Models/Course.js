const mongoose = require('mongoose');
const { Schema } = mongoose;

const COURSE_SCHEMA = new Schema({
	name: {
		type: String,
		required: true
	},
	grade: {
		type: String,
		required: true
	},
	subjects: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "SUBJECT"
	},
})

module.exports = mongoose.model("COURSE", COURSE_SCHEMA)