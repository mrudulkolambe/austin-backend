const jwt = require('jsonwebtoken');

const canManageBranch = (req, res, next) => {
	try {
		let token = req?.headers?.authorization?.split(" ")[1];
		const data = jwt.verify(token, process.env.JWT_SECRET)
		if (data && data.role.canManageBranch) {
			next();
		} else {
			return res.json({ error: true, message: "Unauthorized access" });
		}
	} catch (err) {
		return res.json({ error: true, message: err.message })
	}
}

module.exports = canManageBranch;