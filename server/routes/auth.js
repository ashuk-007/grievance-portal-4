const express = require('express')
const router = express.Router()
const { login, register, resetPassword, forgotPassword } = require('../controllers/auth')
const { officerLogin } = require('../controllers/officer-auth')
const { adminLogin } = require('../controllers/admin-auth')


router.route('/login').post(login)
router.route('/register').post(register)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// router.route('/logout').get(logout)
// router.route('/editprofile/:id').patch(updateUserInfo)

router.route('/officer/login').post(officerLogin)
// router.route('/officer/register').post(officerRegister)

router.route('/admin/login').post(adminLogin)

module.exports = router