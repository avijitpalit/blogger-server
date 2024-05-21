const User = require('../Models/UserModel')
// const userVerification = require('../Middlewares/AuthMiddleware')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const authVerify = (req) => {
    const token = req.cookies.token
    if(!token) return res.json({ status: false })
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if(err) return { status: false }
        else {
            const user = await User.findById(data.id)
            if(user) return { status: true, email: user.email, password: user.password }
            else return { status: false }
        }
    })
}

const update = async (req, res, next) => {
    try {
        const authData = authVerify()
        console.log(authData)
        // const { fname, lname, email, password } = req.body
        // const result = await User.updateOne({ email, password }, { $set: { fname, lname } }) 
        // console.log('test nodemon');
        res.status(201).json({ modified: result.modifiedCount })
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

const getUser = async (req, res) => {
    try{
        const { email } = req.params
        const result = await User.findOne({ email }, { fname: 1, lname: 1, email: 1 })
        if(result) res.status(201).json({ done: true, result })
        else res.status(400).json({done: false})
    } catch(error){
        console.log(error)
        res.status(400).json({ error })
    }
}

const test = (req, res) => {
    console.log(req.body)
    res.status(201).json({ done: true, msg: 'user test working' })
}

module.exports = { update, getUser }