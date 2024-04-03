const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const port = 3002

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to database'))

// User schema
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})
const User = mongoose.model('User', userSchema)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/user', async (req, res) => {
    console.log(req.body);
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.listen(port, () => {
    console.log(`Simple blog listening on port ${ port }`);
})