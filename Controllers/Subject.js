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

const updateSubject = async (req, res) => {
	try {
		const updatedSubject = await Subject.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		})
		if (updatedSubject) {
			res.json({ error: false, message: 'Subject updated successfully!', subject: updatedSubject });
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

const deleteSubject = async (req, res) => {
	try {
		await Subject.findByIdAndDelete(req.params._id);
		res.json({ error: false, message: "Subject Deleted Successfully", subject: undefined });
	} catch (error) {
		res.json({ error: true, message: error.message, subject: undefined });
	}
}


module.exports = {
	createSubject,
	getAllSubjects,
	deleteSubject,
	updateSubject
}