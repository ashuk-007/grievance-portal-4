const express = require('express')
const router = express.Router()
const { getUserDetails, updateUserDetails } = require('../controllers/user')
const {roleAuthenticationMiddleware} = require('../middleware/roleAuthentication')

router.route('/', roleAuthenticationMiddleware('user')).get(getUserDetails)
router.route('/:id').patch(updateUserDetails)

module.exports = router