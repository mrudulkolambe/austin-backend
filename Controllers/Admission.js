const AdmissionForm = require("../Models/AdmissionForm")

const getAllAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({}, {password: 0});
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
		const admission = await AdmissionForm.findById(req.params._id, {password: 0});
		if (admission) {
			res.json({ error: false, message: 'Fetched admission successfully!', admission: admission })
		} else {
			res.json({ error: true, message: 'No result found!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const getAdmissionByToken = async (req, res) => {
	try {
		const admission = await AdmissionForm.findById(req.user._id, {password: 0});
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

module.exports = { getAllAdmissions, getAllConfirmedAdmissions, getAllPendingAdmissions, getAdmissionById, createAdmission, getAdmissionByToken }