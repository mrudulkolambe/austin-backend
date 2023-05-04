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

module.exports = {
	createSubject
}