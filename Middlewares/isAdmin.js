const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
	try {
		let token = req?.headers?.authorization?.split(" ")[1];
		const data = jwt.verify(token, process.env.JWT_SECRET)
		// let user = {
		// 	_id: data._id,
		// 	username: data.username,
		// 	email: data.email,
		// 	role: data.role
		// }
		if (data && data.role === "admin") {
			next();
		} else {
			return res.json({ error: true, message: "Unauthorized access" });
		}
	} catch (err) {
		return res.json({ error: true, message: err.message })
	}
}

module.exports = isAdmin;