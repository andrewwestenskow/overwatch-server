const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const {
  getPlayerHistory,
  getPlayerHeroHistory,
} = require('../../controllers/history')

router.get('/:player_id', checkAuth, getPlayerHistory)
router.get('/:player_id/heroes/:hero_id', checkAuth, getPlayerHeroHistory)

module.exports = router
