const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: "mrudul@connectia.in",
		pass: "vuexifpwmfpfwwah"
	}
});

const setPasswordEmail = async (req, res) => {
	transporter.sendMail({
		from: '"Fred Foo 👻" <mrudul@connectia.in>', // sender address
		to: "mrudulkolambe02@gmail.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	})
	.then((res) => {
		res.send(data)
	})
	.catch((err) => {
		res.send(err)
	})
}

module.exports = { transporter, setPasswordEmail }