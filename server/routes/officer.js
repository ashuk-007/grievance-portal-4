const express = require('express')
const router = express.Router()
const { getOfficerDetails, updateOfficerDetails } = require('../controllers/officer')
// const { roleAuthenticationMiddleware } = require('../middleware/roleAuthentication')

router.route('/').get(getOfficerDetails).patch(updateOfficerDetails)

module.exports = router