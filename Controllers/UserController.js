const User = require('../Models/UserModel')
// const authenticateJWT = require('../Middlewares/AuthMiddleware')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const update = async (req, res, next) => {
    try {
        const { fname, lname } = req.body;
        const user = req.user
        // console.log(user);
        // console.log(req.body);
        const result = await User.updateOne({ _id: user._id }, { $set: { fname, lname } })
        // console.log(result);
        res.status(201).json({ done: result.acknowledged ? true : false });
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

const getUser = async (req, res) => {
    try{
        // console.log(req.header('Authorization'));
        const user = req.user
        res.status(201).json({
            fname: user.fname,
            lname: user.lname,
            email: user.email
        })
    } catch(error){
        console.log(error)
        res.status(400).json({ error })
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPw, newPw } = req.body
        const user = req.user
        if(user.password != oldPw) throw 'Wrong current password entered'
        const result = await User.updateOne({ _id: user._id }, { $set: { password: newPw } })
        console.log(result);
        if(!result.acknowledged) throw 'DB error, password not updated'
        res.status(200).json({ msg: 'Password changed successfully' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error })
    }
}

const test = (req, res) => {
    console.log(req.body)
    res.status(201).json({ done: true, msg: 'user test working' })
}

module.exports = { update, getUser, changePassword }