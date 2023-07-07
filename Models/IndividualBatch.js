const mongoose = require('mongoose');
const { Schema } = mongoose;

const INDIVIDUAL_BATCH_SCHEMA = new Schema({
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
		default: 'one-on-one'
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
	},
	hours: {
		type: Number,
	},
	amountPerStudent: {
		type: Number
	},
}, { timestamps: true });


module.exports = mongoose.model("INDIVIDUAL-BATCH", INDIVIDUAL_BATCH_SCHEMA);