const jwt = require('jsonwebtoken');

const isBranchManagerViewer = (req, res, next) => {
	try {
		let token = req?.headers?.authorization?.split(" ")[1];
		const data = jwt.verify(token, process.env.JWT_SECRET)
		if (data && data.role === "branch-manager-viewer") {
			const user = {
				_id: data._id
			}
			req["user"] = user
			next();
		} else {
			return res.json({ error: true, message: "Unauthorized access" });
		}
	} catch (err) {
		return res.json({ error: true, message: err.message })
	}
}

module.exports = isBranchManagerViewer;