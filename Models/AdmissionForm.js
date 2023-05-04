const mongoose = require('mongoose');
const { Schema } = mongoose


const ADMISSION_FORM = new Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	middlename: {
		type: String,
		required: true,
	},
	photoURL: {
		type: String,
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'transgender'],
		required: true,
	},
	DOB: {
		type: Date,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	landmark: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	pincode: {
		type: String,
		required: true,
	},
	nationality: {
		type: String,
		required: true,
	},
	mobileNoPrimary: {
		type: String,
		required: true,
	},
	mobileNoSecondary: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	father_name: {
		type: String,
		required: true,
	},
	father_phone_number: {
		type: String,
	},
	father_email: {
		type: String,
	},
	father_occupation: {
		type: String,
	},
	mother_name: {
		type: String,
		required: true,
	},
	mother_phone_number: {
		type: String,
	},
	mother_email: {
		type: String,
	},
	mother_occupation: {
		type: String,
	},
	admissionYear: {
		type: Date,
		required: true,
	},
	grade: {
		type: String,
		required: true,
	},
	reference: {
		type: String,
	},
	guardian_name: {
		type: String,
	},
	guardian_phone_number: {
		type: String,
	},
	guardian_email: {
		type: String,
	},
	guardian_occupation: {
		type: String,
	},
	confirmed: {
		type: Boolean,
		required: true,
		default: false
	}
})

module.exports = mongoose.model("ADMISSION", ADMISSION_FORM);