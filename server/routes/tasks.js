const express = require('express')
const router = express.Router()
const { getAllTasks, getTask, passTask, updateTask } = require('../controllers/tasks')

// router.route('/').get(getAllComplaints).post(createComplaint)
// router.route('/:id').get(getComplaint).delete(deleteComplaint)
// router.route(':/id').patch(updateUserComplaint)

router.route('/').get(getAllTasks)
router.route('/:id').get(getTask)
router.route('/pass/:id').patch(passTask)
router.route('/feedback/:id').patch(updateTask)


module.exports = router