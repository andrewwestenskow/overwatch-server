const express = require('express')
const router = express.Router()

const auth = require('./routers/auth')
const player = require('./routers/players')
const heroes = require('./routers/heroes')
const maps = require('./routers/maps')

router.use('/auth', auth)
router.use('/players', player)
router.use('/heroes', heroes)
router.use('/maps', maps)

module.exports = router
