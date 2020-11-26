const express = require('express')
const router = express.Router()
const results = require('../../controllers/results')
const compareEmails = require('../../middleware/compareEmails')
const checkAuth = require('../../middleware/checkAuth')

const {
  recordResults,
  getResults,
  getAllHeroResults,
  getAllMapResults,
} = results

router.post('/:player_id', checkAuth, recordResults)
router.get('/:player_id', checkAuth, getResults)
router.get('/:player_id/heroes', checkAuth, getAllHeroResults)
router.get('/:player_id/maps', checkAuth, getAllMapResults)

module.exports = router
