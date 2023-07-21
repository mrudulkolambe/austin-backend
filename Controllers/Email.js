const nodemailer = require("nodemailer");
const AdmissionForm = require("../Models/AdmissionForm");
const User = require("../Models/User");
const BranchManager = require("../Models/BranchManager");
const jwt = require("jsonwebtoken");
const Teacher = require("../Models/Teacher");


const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: `${process.env.SMTP_USER}`,
		pass: `${process.env.SMTP_PASSWORD}`,
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

const resetPasswordEmail = async (req, res) => {
	let user = undefined;
	if (req.body.type === "student") {
		user = await AdmissionForm.findOne({ email: req.body.email });
	} else if (req.body.type === "teacher") {
		user = await Teacher.findOne({ email: req.body.email });
	} else if (req.body.type === "branch-manager") {
		user = await BranchManager.findOne({ email: req.body.email });
	} else if (req.body.type === "admin") {
		user = await User.findOne({ email: req.body.email });
	}
	if (user) {
		const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
			expiresIn: '300s'
		})
		user.token = token;
		user.save()
			.then(() => {
				transporter.sendMail({
					from: `"Austin Educators" <${process.env.SMTP_USER}>`,
					to: user.email,
					subject: "Reset your password",
					text: "Hello world?",
					html: `<!DOCTYPE html>
				<html lang="en">
				   <head>
					  <meta charset="UTF-8">
					  <meta name="viewport" content="width=device-width, initial-scale=1.0">
					  <title>Password Reset</title>
				   </head>
				   <body style="font-family: 'Nunito';">
					  <section class="w-screen h-screen bg-white flex items-center justify-center" style="color: black;width: 100vw;height: 100vh;background-color: rgb(255 255 255);display: flex;align-items: center;justify-content: center;">
						 <div class="text-center" style="text-align: center;">
							<h1 class="text-3xl font-extrabold mb-5" style="font-size: 1.875rem;line-height: 2.25rem;font-weight: 800;margin-bottom: 1.25rem;">Password Reset</h1>
							<div class="bg-white px-10 py-6 shadow-xl rounded-xl border" style="background-color: rgb(255 255 255);padding-left: 2.5rem;padding-right: 2.5rem;padding-top: 1.5rem;padding-bottom: 1.5rem;border-radius: 0.75rem;border-width: 1px;">
							   <h2 class="font-bold text-2xl" style="font-weight: 700;font-size: 1.5rem;line-height: 2rem;">A request has been received to change the password <br> for Austin
								  Educators Account
							   </h2>
							   <p class="font-bold mt-3" style="font-weight: 700;margin-top: 0.75rem;">To reset your password, visit the following address:</p>
							   <a href='${process.env.DASHBOARD_URL}reset-password/${token}'" class="mt-4 px-6 py-3 text-sm bg-[#91218f] text-white rounded-xl font-bold" style="border-radius: 0.75rem;font-weight: 700;margin-top: 1rem;padding-left: 1.5rem;padding-right: 1.5rem;padding-top: 0.75rem;padding-bottom: 0.75rem;font-size: 0.875rem;line-height: 1.25rem;background-color: rgb(145 33 143);color: rgb(255 255 255);">Click here to reset
							   your password</a>
							   <p class="mt-3" style="margin-top: 0.75rem;">Your email: <span class="text-[#91218f] font-semibold" style="font-weight: 600;">${user.email}</span>
							   </p>
							   <p class="font-bold mt-3" style="font-weight: 700;margin-top: 0.75rem;">If this was a mistake, just ignore this email and nothing will happen</p>
							</div>
						 </div>
					  </section>
				   </body>
				</html>`
				})
					.then(() => {
						res.json({ error: false, message: "Password reset email send successfully!", data: { from: process.env.SMTP_USER, to: user.email, subject: "Reset your password" } })
					})
					.catch((err) => {
						res.json({ error: true, message: err.message })
					})
			})
	} else {
		res.json({ error: true, message: "User not found" })
	}

}

module.exports = { transporter, setPasswordEmail, resetPasswordEmail }