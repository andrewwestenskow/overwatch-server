const express = require('express')
const router = express.Router()
const results = require('../../controllers/results')
const compareEmails = require('../../middleware/compareEmails')
const checkAuth = require('../../middleware/checkAuth')

const { recordResults, getResults } = results

router.post('/:player_id', checkAuth, recordResults)
router.get('/:player_id', checkAuth, getResults)

module.exports = router
