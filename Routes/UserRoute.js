const UserController = require('../Controllers/UserController');
const router = require('express').Router();
const authenticateJWT = require('../Middlewares/AuthMiddleware');


router.post('/update', authenticateJWT, UserController.update);
router.get('/', authenticateJWT, UserController.getUser);
router.post('/change-pw', authenticateJWT, UserController.changePassword);
//router.post('/test', test)

module.exports = router;