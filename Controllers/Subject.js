const Subject = require('../Models/Subject')

const createSubject = async (req, res) => {
	try {
		const newSubject = new Subject(req.body);
		const finalSubject = await newSubject.save();
		if (finalSubject) {
			res.json({ error: false, message: 'Subject Created Successfully!', subject: finalSubject });
		} else {
			res.json({ error: true, message: 'Something went wrong!', subject: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, subject: undefined });
	}
}

const getAllSubjects = async (req, res) => {
	try {
		const subjects = await Subject.find({});
		if (subjects) {
			res.json({ error: false, message: 'Subject fetched successfully!', subjects: subjects });
		} else {
			res.json({ error: true, message: 'Something went wrong!', subjects: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, subject: undefined });
	}
}

module.exports = {
	createSubject,
	getAllSubjects
}