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
		enum: ['one-on-one', 'regular']
	},
	branch: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "BRANCH"
	},
	Subjects: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: 'SUBJECTS'
	},
	teachers: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "TEACHER"
	}
}, { timestamps: true });


module.exports = mongoose.model("BATCH", BATCH_SCHEMA);