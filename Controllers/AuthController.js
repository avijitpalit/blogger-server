const User = require('../Models/UserModel')
const { createSecretToken } = require('../util/SecretToken')

module.exports.Signup = async (req, res, next) => {
    try {
        const { fname, lname, email, password } = req.body
        const isUserExist = await User.findOne({ email })
        if(isUserExist) return res.json({ msg: 'User already exists' })
        const user = await User.create({ fname, lname, email, password })
        if(user._id) res.status(201).json({
            msg: 'User created successfully'
        })
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports.Signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })
        if(!user) return res.json({ msg: 'Invalid username and password', done: false })
        const token = createSecretToken(user._id)
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false
        })
        // console.log(token)
        res.status(201).json({ done: true, msg: 'Signed in successfully' })
        next()
    } catch (error) {
        console.log(error)
    }
}