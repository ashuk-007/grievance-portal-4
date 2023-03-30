const express = require('express')
const router = express.Router()
const { adminLogin } = require('../controllers/officer-auth')

router.route('/admin/login').post(adminLogin)

module.exports = router