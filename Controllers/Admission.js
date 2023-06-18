const AdmissionForm = require("../Models/AdmissionForm")
const bcrypt = require("bcrypt");

const getAllAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({}, { password: 0 });
		if (admissions) {
			res.json({ error: false, message: 'Fetched admissions successfully!', admissions: admissions })
		} else {
			res.json({ error: true, message: 'No results found!', admissions: [] })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admissions: [] })
	}
}

const getAllConfirmedAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({ confirmed: true });
		if (admissions) {
			res.json({ error: false, message: 'Fetched admissions successfully!', admissions: admissions })
		} else {
			res.json({ error: true, message: 'No results found!', admissions: [] })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admissions: [] })
	}
}

const getAllPendingAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({ confirmed: false });
		if (admissions) {
			res.json({ error: false, message: 'Fetched admissions successfully!', admissions: admissions })
		} else {
			res.json({ error: true, message: 'No results found!', admissions: [] })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admissions: [] })
	}
}

const getAdmissionById = async (req, res) => {
	try {
		const admission = await AdmissionForm.findById(req.params._id, { password: 0 });
		if (admission) {
			res.json({ error: false, message: 'Fetched admission successfully!', admission: admission })
		} else {
			res.json({ error: true, message: 'No result found!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const confirmStudentAdmission = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		await AdmissionForm.findByIdAndUpdate(req.params._id, { username: req.body.username, password: hashedPassword, confirmed: true }, {
			returnOriginal: false
		});
		const updatedStudent = await AdmissionForm.findById(req.params._id, { password: 0 });
		if (updatedStudent) {
			res.json({ error: false, message: "Student Updated Successfully", student: updatedStudent });
		} else {
			res.json({ error: true, message: "Something went wrong!", student: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, student: undefined });
	}
}

const getAdmissionByToken = async (req, res) => {
	try {
		const admission = await AdmissionForm.findById(req.user._id, { password: 0 });
		if (admission) {
			res.json({ error: false, message: 'Fetched admission successfully!', admission: admission })
		} else {
			res.json({ error: true, message: 'No result found!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const createAdmission = async (req, res) => {
	try {
		const newAdmission = new AdmissionForm(req.body);
		const finalAdmission = await newAdmission.save();
		if (finalAdmission) {
			res.json({ error: false, message: 'Created admission successfully!', admission: finalAdmission })
		} else {
			res.json({ error: true, message: 'No result found!!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const editAdmissions = async (req, res) => {
	try {
		await AdmissionForm.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		const updatedStudent = await AdmissionForm.findById(req.params._id);
		if (updatedStudent) {
			res.json({ error: false, message: "Student Updated Successfully", student: updatedStudent });
		} else {
			res.json({ error: true, message: "Something went wrong!", student: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, student: undefined });
	}
}

const handleIsDisabled = async (req, res) => {
	try {
		await AdmissionForm.findByIdAndUpdate(req.params._id, { isDisabled: req.body.isDisabled }, {
			returnOriginal: false
		});
		const updatedStudent = await AdmissionForm.findById(req.params._id);
		if (updatedStudent) {
			res.json({ error: false, message: "Student Updated Successfully", student: updatedStudent });
		} else {
			res.json({ error: true, message: "Something went wrong!", student: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, student: undefined });
	}
}

module.exports = { getAllAdmissions, getAllConfirmedAdmissions, getAllPendingAdmissions, getAdmissionById, createAdmission, getAdmissionByToken, editAdmissions, confirmStudentAdmission, handleIsDisabled }