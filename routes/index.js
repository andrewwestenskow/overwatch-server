const express = require('express')
const router = express.Router()

const auth = require('./routers/auth')
const player = require('./routers/players')
const heroes = require('./routers/heroes')
const maps = require('./routers/maps')
const results = require('./routers/results')
const platforms = require('./routers/platforms')
const history = require('./routers/history')

router.use('/auth', auth)
router.use('/players', player)
router.use('/heroes', heroes)
router.use('/maps', maps)
router.use('/results', results)
router.use('/platforms', platforms)
router.use('/history', history)

module.exports = router
