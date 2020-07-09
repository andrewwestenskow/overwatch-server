const express = require('express')
const router = express.Router()
const auth = require('../../controllers/auth')

const { register, login, logout } = auth

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)

module.exports = router
