const express = require('express')
const router = express.Router()
const maps = require('../../controllers/maps')
const checkAuth = require('../../middleware/checkAuth')

const { getAllMaps } = maps

router.get('/', checkAuth, getAllMaps)

module.exports = router
