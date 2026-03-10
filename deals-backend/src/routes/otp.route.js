const express = require('express')
const router = express.Router()
const otpGenerator = require('../controllers/auth/otp')
router.post('/generateotp' , otpGenerator)
module.exports = router