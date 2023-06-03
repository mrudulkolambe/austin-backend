const ChapterAllocation = require("../Models/ChapterAllocation")

const createChapterAllocation = async (req, res) => {
	try {
		const chapterAllocation = new ChapterAllocation(req.body);
		const newChapterAllocation = await chapterAllocation.save();
		const finalChapterAllocation = await ChapterAllocation.findById(newChapterAllocation._id).populate("teacher").populate("chapter").populate("batch").populate("subject");
		if (finalChapterAllocation) {
			res.json({ error: false, message: "Successful", chapterAllocation: finalChapterAllocation })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapterAllocation: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapterAllocation: undefined })
	}
}

const getAllChapterAllocation = async (req, res) => {
	try {
		const chapterAllocations = await ChapterAllocation.find().populate("teacher").populate("chapter").populate("batch").populate("subject");
		if (chapterAllocations) {
			res.json({ error: false, message: "Successful fetched!", chapterAllocations: chapterAllocations })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapterAllocations: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapterAllocations: undefined })
	}
}

const updateChapterAllocation = async (req, res) => {
	try {
		const updatedChapterAllocation = await ChapterAllocation.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		const finalChapterAllocation = await ChapterAllocation.findById(req.params._id).populate("teacher").populate("chapter").populate("batch").populate("subject");
		if (finalChapterAllocation) {
			res.json({ error: false, message: "Chapter Allocation successfully updated!", chapterAllocation: finalChapterAllocation })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapterAllocation: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapterAllocation: undefined })
	}
}

module.exports = { createChapterAllocation, getAllChapterAllocation, updateChapterAllocation }