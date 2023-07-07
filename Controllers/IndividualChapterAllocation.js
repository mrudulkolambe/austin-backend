const IndividualChapterAllocation = require("../Models/IndividualChapterAllocation");

const createChapterAllocation = async (req, res) => {
	try {
		const chapterAllocation = new IndividualChapterAllocation(req.body);
		const newChapterAllocation = await chapterAllocation.save();
		const finalChapterAllocation = await IndividualChapterAllocation.findById(newChapterAllocation._id).populate("teacher").populate("chapter").populate("subject").populate("individualBatch");
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
		const chapterAllocations = await IndividualChapterAllocation.find().populate("teacher").populate("chapter").populate("subject").populate("individualBatch");
		if (chapterAllocations) {
			res.json({ error: false, message: "Successful fetched!", chapterAllocations: chapterAllocations })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapterAllocations: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapterAllocations: undefined })
	}
}

const getAllChapterAllocationByToken = async (req, res) => {
	try {
		const chapterAllocations = await IndividualChapterAllocation.find({ teacher: req.user._id }).populate("teacher").populate("chapter").populate("subject").populate("individualBatch");
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
		const updatedChapterAllocation = await IndividualChapterAllocation.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		const finalChapterAllocation = await IndividualChapterAllocation.findById(req.params._id).populate("teacher").populate("chapter").populate("subject").populate("individualBatch");
		if (finalChapterAllocation) {
			res.json({ error: false, message: "Chapter Allocation successfully updated!", chapterAllocation: finalChapterAllocation })
		} else {
			res.json({ error: true, message: "Something went wrong!", chapterAllocation: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, chapterAllocation: undefined })
	}
}

module.exports = { createChapterAllocation, getAllChapterAllocation, updateChapterAllocation, getAllChapterAllocationByToken }