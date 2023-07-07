const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('strictQuery', true);

const app = express();
const port = 1000;

app.use(cors({
	origin: '*'
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

const userRouter = require('./Routes/User');
app.use("/user", userRouter)

const branchRouter = require('./Routes/Branch');
app.use("/branch", branchRouter)

const chapterAllocationRouter = require('./Routes/ChapterAllocation');
app.use("/chapterAllocation", chapterAllocationRouter)

const individualChapterAllocationRouter = require('./Routes/IndividualChapterAllocation');
app.use("/individual-chapterAllocation", individualChapterAllocationRouter)

const batchRouter = require('./Routes/Batch.js');
app.use("/batch", batchRouter)

const individualBatchRouter = require('./Routes/IndividualBatch');
app.use("/individual-batch", individualBatchRouter)

const rolesRouter = require('./Routes/Role');
app.use("/role", rolesRouter)

const courseRouter = require('./Routes/Course');
app.use("/course", courseRouter)

const subjectRouter = require('./Routes/Subject');
app.use("/subject", subjectRouter)

const chapterRouter = require('./Routes/Chapter');
app.use("/chapter", chapterRouter)

const AdmissionRouter = require('./Routes/Admission');
app.use("/admission", AdmissionRouter)

const TeacherRouter = require('./Routes/Teacher');
app.use("/teacher", TeacherRouter)

const EmailRouter = require('./Routes/Email');
app.use("/email", EmailRouter)

const BranchManagerRouter = require('./Routes/BranchManager');
app.use("/branch-manager", BranchManagerRouter)

const AttendanceRouter = require('./Routes/Attendance');
app.use("/attendance", AttendanceRouter)

const IndividualAttendanceRouter = require('./Routes/IndividualAttendance');
app.use("/individual-attendance", IndividualAttendanceRouter)



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(() => console.log("Connected to db"))
	.catch((err) => console.log(err))


app.get('/', (req, res) => {
	res.send('Hello World!')
})


app.listen(port, () => {
	console.log(`Austin backend listening on port ${port}`)
})