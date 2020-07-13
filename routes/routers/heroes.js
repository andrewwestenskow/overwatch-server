const express = require('express')
const router = express.Router()
const heroes = require('../../controllers/heroes')
const checkAuth = require('../../middleware/checkAuth')

const { getAllHeroes } = heroes

router.get('/', checkAuth, getAllHeroes)

module.exports = router
