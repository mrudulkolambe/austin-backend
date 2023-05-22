const Chapter = require("../Models/Chapter")


const createChapter = async (req, res) => {
	try {
		const chapter = new Chapter(req.body);
		const newChapter = await chapter.save();
		const finalChapter = await Chapter.findOne({ _id: newChapter._id }).populate("subjectID");
		if (newChapter) {
			res.json({ error: false, message: "Chapter created successfully!", chapter: finalChapter })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapter: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapter: undefined })
	}
}

const updateChapter = async (req, res) => {
	try {
		const chapter = Chapter.findByIdAndUpdate(req.params._id, req.body);
		const finalChapter = await Chapter.findOne({ _id: chapter._id }).populate("subjectID");
		if (chapter) {
			res.json({ error: false, message: "Chapter updated successfully!", chapter: finalChapter })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapter: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapter: undefined })
	}
}

const getAllChapters = async (req, res) => {
	try {
		const chapters = await Chapter.find({}).populate('subjectID');
		if (chapters) {
			res.json({ error: false, message: "Chapters fetched successfully!", chapters: chapters });
		} else {
			res.json({ error: true, message: "Something went wrong!", chapters: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapter: undefined })
	}
}

module.exports = { createChapter, getAllChapters, updateChapter };