const Complaint = require('../models/Complaint')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllComplaints = async (req, res) => {
    const complaints = await Complaint.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: complaints.length, complaints })
}

const getComplaint = async (req, res) => {
    const { user: { userId }, params: { id: complaintId } } = req

    const complaint = await Complaint.findOne({ _id: complaintId, createdBy: userId })
    if (!complaint) {
        throw new NotFoundError('Job not found')
    }
    res.status(StatusCodes.OK).json({ complaint })
}

const createComplaint = async (req, res) => {
    req.body.createdBy = req.user.userId
    const complaint = await Complaint.create(req.body)
    res.status(StatusCodes.CREATED).json({ complaint })
}

// const updateUserComplaint = async (req, res) => {
//     const {
//         body: { description },
//         user: { userId },
//         params: { id: complaintId },
//     } = req

//     if (description === '') {
//         throw new BadRequestError('Please fill in description')
//     }
//     const complaint = await Complaint.findByIdAndUpdate({ _id: complaintId, createdBy: userId }, req.body, { new: true, runValidators: true })
//     if (!job) {
//         throw new NotFoundError('Job not found')
//     }
//     res.status(StatusCodes.OK).json({ job })
// }

const deleteComplaint = async (req, res) => {
    const { user: { userId }, params: { id: complaintId } } = req

    const complaint = await Complaint.findByIdAndRemove({
        _id: complaintId,
        createdBy: userId
    })
    if (!complaint) {
        throw new NotFoundError('Complaint not found')
    }
    res.status(StatusCodes.OK).json({ complaint })

}

module.exports = { getAllComplaints, getComplaint, createComplaint, deleteComplaint };