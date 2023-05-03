const express = require('express')
const router = express.Router()
const { registerOfficer, getAdminDetails, getOfficerData, deleteOfficer } = require('../controllers/admin')

router.route('/registerOfficer').post(registerOfficer)
router.route('/').get(getAdminDetails)
router.route('/getOfficerData').get(getOfficerData)
router.route('/deleteOfficer/:id').delete(deleteOfficer)

module.exports = router

