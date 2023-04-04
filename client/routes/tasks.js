const express = require('express')
const router = express.Router()
const { getAllTasks } = require('../controllers/tasks')

// router.route('/').get(getAllComplaints).post(createComplaint)
// router.route('/:id').get(getComplaint).delete(deleteComplaint)
// router.route(':/id').patch(updateUserComplaint)

router.route('/').get(getAllTasks)


module.exports = router