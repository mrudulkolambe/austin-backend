const Batch = require("../Models/Batch")

const createBatch = async (req, res) => {
	try {
		const batch = new Batch(req.body);
		const newBatch = await batch.save();
		const finalBatch = await Batch.findOne({_id: newBatch._id}).populate("branch").populate("course")
		if (newBatch) {
			res.json({ error: false, message: "Batch created successfully!", batch: finalBatch })
		} else {
			res.json({ error: true, message: "Something went wrong!", batch: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, batch: undefined })
	}
}

const getAllBatches = async  (req, res) => {
	try {
		const batches = await Batch.find({}).populate("branch").populate("course");
		if (batches) {
			res.json({ error: false, message: "Batches fetched successfully!", batches: batches })
		}else{
			res.json({ error: true, message: "Something went wrong!", batches: undefined })
		}
	} catch (error) {
			res.json({ error: true, message: error.message, batches: undefined })
		}
}

module.exports = { createBatch, getAllBatches };