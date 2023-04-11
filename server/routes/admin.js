const express = require('express')
const router = express.Router()
const { officerRegister } = require('../controllers/admin')

router.route('/registerOfficer').post(officerRegister)

module.exports = router

