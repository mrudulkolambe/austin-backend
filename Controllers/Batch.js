const Batch = require("../Models/Batch");
const ChapterAllocation = require("../Models/ChapterAllocation");

const createBatch = async (req, res) => {
	try {
		const batch = new Batch(req.body);
		const newBatch = await batch.save();
		const finalBatch = await Batch.findOne({ _id: newBatch._id }).populate("branch").populate("course").populate("students")
		if (newBatch) {
			res.json({ error: false, message: "Batch created successfully!", batch: finalBatch })
		} else {
			res.json({ error: true, message: "Something went wrong!", batch: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, batch: undefined })
	}
}

const getAllBatches = async (req, res) => {
	try {
		const batches = await Batch.find({}).populate("branch").populate("course").populate("students");
		if (batches) {
			res.json({ error: false, message: "Batches fetched successfully!", batches: batches })
		} else {
			res.json({ error: true, message: "Something went wrong!", batches: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, batches: undefined })
	}
}

const getBatchesByStudentToken = async (req, res) => {
	try {
		const batches = await Batch.find({ students: req.user._id }).populate("branch").populate("course");
		if (batches) {
			res.json({ error: false, message: "Batches fetched successfully!", batches: batches })
		} else {
			res.json({ error: true, message: "Something went wrong!", batches: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, batches: undefined })
	}
}

const getBatchesByTeacherToken = async (req, res) => {
	try {
		let batchArray = []
		let batchSet = new Set(batchArray);
		const chapterAllocations = await ChapterAllocation.find({ teacher: req.user._id }).populate("batch").populate({
			path: 'batch',
			populate: {
				path: 'branch',
				model: 'BRANCH'
			}
		}).populate({
			path: 'batch',
			populate: {
				path: 'students',
				model: 'ADMISSION',
				select:'-password'
			}
		}).populate({
			path: 'batch',
			populate: {
				path: 'course',
				model: 'COURSE',
				populate: {
					path: "subjects",
					model: "SUBJECT"
				}
			}
		})
		chapterAllocations?.map((ChapterAllocation) => {
			batchSet.add(ChapterAllocation?.batch)
		})
		batchArray = [...batchSet]
		if (batchArray) {
			res.json({ error: false, message: "Batches fetched successfully!", batches: batchArray })
		} else {
			res.json({ error: true, message: "Something went wrong!", batches: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, batches: undefined })
	}
}

const updateBatch = async (req, res) => {
	try {
		const batches = await Batch.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		const updatedBatch = await Batch.findById(req.params._id).populate("branch").populate("course").populate("students");
		if (updatedBatch) {
			res.json({ error: false, message: "Batches updated successfully!", batch: updatedBatch })
		} else {
			res.json({ error: true, message: "Something went wrong!", batch: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, batch: undefined })
	}
}

module.exports = { createBatch, getAllBatches, updateBatch, getBatchesByStudentToken, getBatchesByTeacherToken };