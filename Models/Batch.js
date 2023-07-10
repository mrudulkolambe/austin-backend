const mongoose = require('mongoose');
const { Schema } = mongoose;

const BATCH_SCHEMA = new Schema({
	name: {
		type: String,
		required: true
	},
	academicYear: {
		type: String,
		required: true
	},
	typeOfBatch: {
		type: String,
		required: true,
		enum: 'regular'
	},
	branch: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "BRANCH"
	},
	course: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'COURSE'
	},
	students: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "ADMISSION"
	}
}, { timestamps: true });


module.exports = mongoose.model("BATCH", BATCH_SCHEMA);