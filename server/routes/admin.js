const express = require('express')
const router = express.Router()
const { registerOfficer } = require('../controllers/admin')

router.route('/registerOfficer').post(registerOfficer)

module.exports = router

