const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lname: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: Number,
        default: 2
    }
})

module.exports = mongoose.model('User', userSchema)