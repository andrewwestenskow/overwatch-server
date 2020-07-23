const express = require('express')
const router = express.Router()
const platforms = require('../../controllers/platforms')
const checkAuth = require('../../middleware/checkAuth')

const { getAllPlatforms } = platforms

router.get('/', getAllPlatforms)

module.exports = router
