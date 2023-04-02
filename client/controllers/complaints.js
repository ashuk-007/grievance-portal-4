const Complaint = require('../models/Complaint')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const User = require('../models/User')
const Officer = require('../models/Officer')

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

    const user = await User.findOne({_id: req.user.userId})
    const district = user.district
    const department = req.body.department
    
    const officer = await Officer.findOne({district: user.district, level: 1})

    if (!officer){
        throw new NotFoundError('No officer in this district')
    }

    const complaint = await Complaint.create(req.body)
    await officer.addComplaint(complaint._id)

    console.log(officer)
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