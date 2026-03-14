const express = require('express')
const router = express.Router()

const ContactAdmin = require('../controllers/user/contactController')

router.post('/contact' ,ContactAdmin )


module.exports = router 