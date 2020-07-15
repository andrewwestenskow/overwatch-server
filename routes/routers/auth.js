const express = require('express')
const router = express.Router()
const auth = require('../../controllers/auth')
const checkAuth = require('../../middleware/checkAuth')

const { register, login, logout, restoreSession } = auth

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/', checkAuth, restoreSession)

module.exports = router
