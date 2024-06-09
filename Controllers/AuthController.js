const User = require('../Models/UserModel')
const Car = require('../Models/CarModel')
const { createSecretToken } = require('../util/SecretToken');
const jwt = require('jsonwebtoken');

module.exports.Signup = async (req, res, next) => {
    try {
        const { fname, lname, email, password } = req.body
        const isUserExist = await User.findOne({ email })
        // console.log(isUserExist);
        if(isUserExist) return res.json({ msg: 'User already exists' })
        const user = await User.create({ fname, lname, email, password })
        if(user._id) {
            // const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
            res.status(201).json({
                msg: 'User created successfully',
                token: token
            });
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports.Signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })
        // console.log(user);
        if(!user) return res.json({ msg: 'Invalid username and password', done: false })
        const token = createSecretToken(user._id)
        /* res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false
        }) */
        res.status(201).json({ done: true, token, msg: 'Signed in successfully' })
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports.AddCar = async (req, res, next) => {
    try {
        const car = await Car.create({ name: 'getght', type: 'gergt' });
        res.status(201).json({
            msg: 'Car created successfully'
        });
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports.Auth = async (req, res, next) => {
    res.status(200).json({
        done: true
    })
}