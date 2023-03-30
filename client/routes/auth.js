const express = require('express')
const router = express.Router()
const { login, register } = require('../controllers/auth')
const {adminLogin, adminRegister} = require('../controllers/officer-auth')

router.route('/login').post(login)
router.route('/register').post(register)

router.route('/admin/login').post(adminLogin)
router.route('/admin/register').post(adminRegister)

module.exports = router