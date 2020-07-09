const express = require('express')
const router = express.Router()

const player = require('../../controllers/players')

const { createPlayer } = player

router.post('/', createPlayer)

module.exports = router
