const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/checkAuth')

const player = require('../../controllers/players')

const { createPlayer, getAllPlayers, getPlayerById, deletePlayer } = player

router.post('/', checkAuth, createPlayer)
router.get('/', checkAuth, getAllPlayers)
router.get('/:playerId', checkAuth, getPlayerById)
router.delete('/:playerId', checkAuth, deletePlayer)

module.exports = router
