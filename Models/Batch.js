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
	totalHours: {
		type: Number,
	},
	typeOfBatch: {
		type: String,
		required: true
	},
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "USER"
	}
}, { timestamps: true });


module.exports = mongoose.model("BATCH", BATCH_SCHEMA);