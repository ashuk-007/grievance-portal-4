const express = require('express')
const router = express.Router()
const { login, register } = require('../controllers/auth')
const {officerLogin, officerRegister} = require('../controllers/officer-auth')
const {adminLogin} = require('../controllers/admin-auth')

router.route('/login').post(login)
router.route('/register').post(register)

router.route('/officer/login').post(officerLogin)
router.route('/officer/register').post(officerRegister)

router.route('/admin/login').post(adminLogin)

module.exports = router