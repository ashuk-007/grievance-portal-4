const express = require('express')
const router = express.Router()
const { getAllComplaints, getComplaint, createComplaint, deleteComplaint, sendReminder } = require('../controllers/complaints')
// const { roleAuthenticationMiddleware } = require('../middleware/roleAuthentication')

router.route('/').get(getAllComplaints).post(createComplaint)
router.route('/:id').get(getComplaint).delete(deleteComplaint)
router.route('/reminder/:id').patch(sendReminder);


module.exports = router