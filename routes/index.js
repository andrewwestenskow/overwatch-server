const express = require('express')
const router = express.Router()

const auth = require('./routers/auth')
const player = require('./routers/players')

router.use('/auth', auth)
router.use('/players', player)

module.exports = router
