const { update, test, getUser } = require('../Controllers/UserController')
const router = require('express').Router()

router.post('/update', update)
router.get('/:email', getUser)
//router.post('/test', test)

module.exports = router