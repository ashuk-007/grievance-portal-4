const express = require('express')
const router = express.Router()
const { getAllComplaints, getComplaint, createComplaint, deleteComplaint, updateUserComplaint} = require('../controllers/complaints')

router.route('/').get(getAllComplaints).post(createComplaint)
router.route('/:id').get(getComplaint).delete(deleteComplaint)
router.route(':/id').patch(updateUserComplaint)

module.exports = router