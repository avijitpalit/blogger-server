const { Signup, Signin } = require('../Controllers/AuthController')
const { userVerification } = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

router.post('/', userVerification)
router.post('/signup', Signup)
router.post('/signin', Signin)

module.exports = router