const express = require('express')
const router = express.Router()
router.post('/login', require('../model/login'))
router.post('/register', require('../model/register'))
module.exports = router