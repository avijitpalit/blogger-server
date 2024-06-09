const User = require('../Models/UserModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')
    // console.log(token);
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if(err) res.sendStatus(403);
        else {
            const user = await User.findById(data.id)
            if(user) req.user = user
            next()
        }
    })
}

module.exports = authenticateJWT