const express = require('express')
const router = express.Router()
const results = require('../../controllers/results')
const compareEmails = require('../../middleware/compareEmails')
const checkAuth = require('../../middleware/checkAuth')

const { recordResults, getResults, getAllHeroResults } = results

router.post('/:player_id', checkAuth, recordResults)
router.get('/:player_id', checkAuth, getResults)
router.get('/:player_id/heroes', checkAuth, getAllHeroResults)

module.exports = router
