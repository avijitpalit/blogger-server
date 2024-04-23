const { update, test } = require('../Controllers/UserController')
const router = require('express').Router()

router.post('/update', update)
//router.post('/test', test)

module.exports = router