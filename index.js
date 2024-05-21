require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./Routes/AuthRoute')
const userRoute = require('./Routes/UserRoute')
const { MONGO_URL, PORT } = process.env

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

const app = express()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// MongoDB connection
mongoose.connect(MONGO_URL)
const db = mongoose.connection

db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to database'))

// Routes
app.use('/', authRoute)
app.use('/user', userRoute)

app.post('/test', (req, res) => {
    console.log(req.body)
    res.send('Hello world changed')
});

app.listen(3002, () => {
    console.log(`Simple blog listening on port ${ 3002 }`);
})

main().catch(err => console.log(err))

async function main() {
    console.log('inside main function ')
    // await mongoose.connect(MONGO_URL)
}