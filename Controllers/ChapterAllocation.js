const ChapterAllocation = require("../Models/ChapterAllocation")

const createChapterAllocation = async (req, res) => {
	try {
		const chapterAllocation = new ChapterAllocation(req.body);
		const newChapterAllocation = await chapterAllocation.save()
		if (newChapterAllocation) {
			res.json({ error: false, message: "Successfull", chapterAllocation: chapterAllocation })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapterAllocation: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapterAllocation: undefined })
	}
}

module.exports = { createChapterAllocation }