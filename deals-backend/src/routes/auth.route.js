const express = require('express')
const router = express.Router()

const registerUser = require('../controllers/auth/register')
const loginUser = require('../controllers/auth/login')
const logoutUser = require('../controllers/auth/logout')
const ForgetUser = require('../controllers/auth/forget')



router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/forget' , ForgetUser)

module.exports = router