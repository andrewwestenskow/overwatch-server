const express = require('express')
const router = express.Router()

const auth = require('./routers/auth')
const player = require('./routers/players')
const heroes = require('./routers/heroes')

router.use('/auth', auth)
router.use('/players', player)
router.use('/heroes', heroes)

module.exports = router
