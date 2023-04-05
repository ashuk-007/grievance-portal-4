const express = require('express')
const router = express.Router()
const { getUserDetails, updateUserDetails } = require('../controllers/user')

router.route('/').get(getUserDetails)
router.route('/:id').patch(updateUserDetails)

module.exports = router