// const Job = require('../models/Complaint')
// const { StatusCodes } = require('http-status-codes')
// const { BadRequestError, NotFoundError } = require('../errors/')

// const getAllJobs = async (req, res) => {
//     const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
//     res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
// }

// const getJob = async (req, res) => {
//     const { user: { userId }, params: { id: jobId } } = req

//     const job = await Job.findOne({ _id: jobId, createdBy: userId })
//     if (!job) {
//         throw new NotFoundError('Job not found')
//     }
//     res.status(StatusCodes.OK).json({ job })
// }

// const createJob = async (req, res) => {
//     req.body.createdBy = req.user.userId
//     const job = await Job.create(req.body)
//     res.status(StatusCodes.CREATED).json({ job })
// }

// const updateJob = async (req, res) => {
//     const {
//         body: { company, position },
//         user: { userId },
//         params: { id: jobId },
//     } = req

//     if (company === '' || position === '') {
//         throw new BadRequestError('Please fill in all fields')
//     }
//     const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
//     if (!job) {
//         throw new NotFoundError('Job not found')
//     }
//     res.status(StatusCodes.OK).json({ job })
// }

// const deleteJob = async (req, res) => {
//     const { user: { userId }, params: { id: jobId } } = req

//     const job = await Job.findByIdAndRemove({
//         _id: jobId,
//         createdBy: userId
//     })
//     if (!job) {
//         throw new NotFoundError('Job not found')
//     }
//     res.status(StatusCodes.OK).json({ job })

// }

// module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };