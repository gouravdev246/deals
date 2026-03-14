const express = require('express')
const router = express.Router()

const ContactAdmin = require('../controllers/user/contactController')
const getUserCount = require('../controllers/user/getUserCount');

router.get('/count', getUserCount);
router.post('/contact' ,ContactAdmin )


module.exports = router 