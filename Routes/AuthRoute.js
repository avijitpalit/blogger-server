const { Signup, Signin, AddCar, Auth } = require('../Controllers/AuthController')
const authenticateJWT = require('../Middlewares/AuthMiddleware')
const router = require('express').Router()

// router.post('/', userVerification)
router.post('/signup', Signup)
router.post('/signin', Signin)
router.get('/auth', authenticateJWT, Auth)
router.post('/addcar', AddCar)

module.exports = router