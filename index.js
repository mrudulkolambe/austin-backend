const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('strictQuery', true);

const app = express();
const port = 1000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

const userRouter = require('./Routes/User');
app.use("/user", userRouter)

const branchRouter = require('./Routes/Branch');
app.use("/branch", branchRouter)

const rolesRouter = require('./Routes/Role');
app.use("/role", rolesRouter)

app.use(cors())


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(() => console.log("Connected to db"))
	.catch((err) => console.log(err))


app.get('/', (req, res) => {
	res.send('Hello World!')
})


app.listen(port, () => {
	console.log(`Austin backend listening on port ${port}`)
})