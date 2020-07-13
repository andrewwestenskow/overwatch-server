const express = require('express')
const router = express.Router()
const results = require('../../controllers/results')
const compareEmails = require('../../middleware/compareEmails')

const { recordResults, getResults } = results

router.post('/:email', compareEmails, recordResults)
router.get('/:email', compareEmails, getResults)

module.exports = router
