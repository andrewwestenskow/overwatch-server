const express = require('express')
const router = express.Router()
const results = require('../../controllers/results')
const compareEmails = require('../../middleware/compareEmails')
const checkAuth = require('../../middleware/checkAuth')

const { recordResults, getResults } = results

router.post('/:email', checkAuth, compareEmails, recordResults)
router.get('/:email', checkAuth, compareEmails, getResults)

module.exports = router
