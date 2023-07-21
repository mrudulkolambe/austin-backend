const AdmissionForm = require("../Models/AdmissionForm")
const bcrypt = require("bcrypt");
const { transporter } = require("./Email");

const getAllAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({}, { password: 0 });
		if (admissions) {
			res.json({ error: false, message: 'Fetched admissions successfully!', admissions: admissions })
		} else {
			res.json({ error: true, message: 'No results found!', admissions: [] })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admissions: [] })
	}
}

const getAllConfirmedAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({ confirmed: true });
		if (admissions) {
			res.json({ error: false, message: 'Fetched admissions successfully!', admissions: admissions })
		} else {
			res.json({ error: true, message: 'No results found!', admissions: [] })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admissions: [] })
	}
}

const getAllPendingAdmissions = async (req, res) => {
	try {
		const admissions = await AdmissionForm.find({ confirmed: false });
		if (admissions) {
			res.json({ error: false, message: 'Fetched admissions successfully!', admissions: admissions })
		} else {
			res.json({ error: true, message: 'No results found!', admissions: [] })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admissions: [] })
	}
}

const getAdmissionById = async (req, res) => {
	try {
		const admission = await AdmissionForm.findById(req.params._id, { password: 0 });
		if (admission) {
			res.json({ error: false, message: 'Fetched admission successfully!', admission: admission })
		} else {
			res.json({ error: true, message: 'No result found!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const confirmStudentAdmission = async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt)
		await AdmissionForm.findByIdAndUpdate(req.params._id, { username: req.body.username, password: hashedPassword, confirmed: true }, {
			returnOriginal: false
		});
		const updatedStudent = await AdmissionForm.findById(req.params._id, { password: 0 });
		if (updatedStudent) {
			res.json({ error: false, message: "Student Updated Successfully", student: updatedStudent });
		} else {
			res.json({ error: true, message: "Something went wrong!", student: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, student: undefined });
	}
}

const getAdmissionByToken = async (req, res) => {
	try {
		const admission = await AdmissionForm.findById(req.user._id, { password: 0 });
		if (admission) {
			res.json({ error: false, message: 'Fetched admission successfully!', admission: admission })
		} else {
			res.json({ error: true, message: 'No result found!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const createAdmission = async (req, res) => {
	try {
		const newAdmission = new AdmissionForm(req.body);
		const finalAdmission = await newAdmission.save();
		if (finalAdmission) {
			res.json({ error: false, message: 'Created admission successfully!', admission: finalAdmission })
			transporter.sendMail({
				from: `"Austin Educators" <${process.env.SMTP_USER}>`,
				to: `${req.body.email}`,
				subject: "Copy Of Admission Form",
				html: `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Acknowledgement Form</title>
				</head>
				<body style="font-family: 'Nunito';">
				<section class="w-screen h-screen bg-white flex items-center justify-center" style="color: black;width: 100vw;height: 100vh;background-color: rgb(255 255 255);display: flex;align-items: center;justify-content: center;">
				   <div class="text-center" style="text-align: center;">
					  <h1 class="text-3xl font-extrabold mb-5" style="font-size: 1.875rem;line-height: 2.25rem;font-weight: 800;margin-bottom: 1.25rem;">Admission Acknowledgement</h1>
					  <div class="bg-white px-10 py-6 shadow-xl rounded-xl border" style="background-color: rgb(255 255 255);padding-left: 2.5rem;padding-right: 2.5rem;padding-top: 1.5rem;padding-bottom: 1.5rem;border-radius: 0.75rem;border-width: 1px;">
						 <h2 class="font-bold text-2xl" style="font-weight: 700;font-size: 1.5rem;line-height: 2rem;">An admission request has been received <br> for Austin
							Educators Account
						 </h2>
						 <p class="font-bold mt-3" style="font-weight: 700;margin-top: 0.75rem;">To view the acknowledgement, visit the following address:</p>
						 <a href='${process.env.DASHBOARD_URL}view/admission/${finalAdmission._id}' class="mt-4 px-6 py-3 text-sm bg-[#91218f] text-white rounded-xl font-bold" style="border-radius: 0.75rem;font-weight: 700;margin-top: 1rem;padding-left: 1.5rem;padding-right: 1.5rem;padding-top: 0.75rem;padding-bottom: 0.75rem;font-size: 0.875rem;line-height: 1.25rem;background-color: rgb(145 33 143);color: rgb(255 255 255);">Click here</a>
						 <p class="mt-3" style="margin-top: 0.75rem;">Your email: <span class="text-[#91218f] font-semibold" style="font-weight: 600;">${finalAdmission.email}</span>
						 </p>
						 <p class="font-bold mt-3" style="font-weight: 700;margin-top: 0.75rem;">If this was a mistake, just ignore this email and nothing will happen</p>
					  </div>
				   </div>
				</section>
			 </body>
				
				</html>`
			})
		} else {
			res.json({ error: true, message: 'No result found!!', admission: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, admission: undefined })
	}
}

const editAdmissions = async (req, res) => {
	try {
		await AdmissionForm.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		const updatedStudent = await AdmissionForm.findById(req.params._id);
		if (updatedStudent) {
			res.json({ error: false, message: "Student Updated Successfully", student: updatedStudent });
		} else {
			res.json({ error: true, message: "Something went wrong!", student: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, student: undefined });
	}
}

const handleIsDisabled = async (req, res) => {
	try {
		await AdmissionForm.findByIdAndUpdate(req.params._id, { isDisabled: req.body.isDisabled }, {
			returnOriginal: false
		});
		const updatedStudent = await AdmissionForm.findById(req.params._id);
		if (updatedStudent) {
			res.json({ error: false, message: "Student Updated Successfully", student: updatedStudent });
		} else {
			res.json({ error: true, message: "Something went wrong!", student: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, student: undefined });
	}
}

module.exports = { getAllAdmissions, getAllConfirmedAdmissions, getAllPendingAdmissions, getAdmissionById, createAdmission, getAdmissionByToken, editAdmissions, confirmStudentAdmission, handleIsDisabled }