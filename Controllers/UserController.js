const User = require('../Models/UserModel')

const update = async (req, res, next) => {
    try {
        const { fname, lname, email, password } = req.body
        const result = await User.updateOne({ email, password }, { $set: { fname, lname } }) 
        console.log('test nodemon');
        res.status(201).json({ modified: result.modifiedCount })
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

const test = (req, res) => {
    console.log(req.body)
    res.status(201).json({ done: true, msg: 'user test working' })
}

module.exports = { update }