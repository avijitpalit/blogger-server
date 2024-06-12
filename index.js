require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./Routes/AuthRoute')
const userRoute = require('./Routes/UserRoute')
const Car = require('./Models/UserModel');
const { MONGO_URL, PORT } = process.env;
const authenticateJWT = require('./Middlewares/AuthMiddleware');
const jwt = require('jsonwebtoken');
const postRoute = require('./Routes/PostRoute')

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
app.use('/post', postRoute)

/* app.post('/test', (req, res) => {
    console.log(req.body)
    res.send('Hello world changed')
});

app.get('/test', authenticateJWT, (req, res) => {
    console.log('something');
    res.send('something');
}); */

app.listen(3002, () => {
    console.log(`Simple blog listening on port ${ process.env.PORT }`);
})