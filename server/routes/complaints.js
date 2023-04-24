const express = require('express')
const router = express.Router()
const { getAllComplaints, getComplaint, createComplaint, deleteComplaint, sendReminder, rateOfficer } = require('../controllers/complaints')
// const { roleAuthenticationMiddleware } = require('../middleware/roleAuthentication')

router.route('/').get(getAllComplaints).post(createComplaint)
router.route('/:id').get(getComplaint).delete(deleteComplaint)
router.route('/reminder/:id').patch(sendReminder);
router.route('/rateOfficer/:id').patch(rateOfficer);


module.exports = router