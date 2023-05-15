const mongoose = require('mongoose');
const { Schema } = mongoose;

const COURSE_SCHEMA = new Schema({
	grade: {
		type: String,
		required: true
	},
	subjects: {
		type: [mongoose.SchemaTypes.ObjectId],
	},
})