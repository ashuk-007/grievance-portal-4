const Complaint = require('../models/Complaint')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const User = require('../models/User')
const Officer = require('../models/Officer')

const getAllTasks = async (req, res) => {

    console.log(req.user);
    const tasks = await Complaint.find({ officerID: req.user.officerID }).sort('createdAt')
    console.log(tasks)
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks })
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

    const user = await User.findOne({ _id: req.user.userId })
    const district = user.district
    const department = req.body.department

    const officer = await Officer.findOne({ district: user.district, level: 1, department: req.body.department })

    if (!officer) {
        throw new NotFoundError('No officer in this district')
    }

    const complaint = await Complaint.create(req.body)
    await complaint.assignOfficer(officer._id)
    await officer.addComplaint(complaint._id)

    console.log(officer)
    res.status(StatusCodes.CREATED).json({ complaint })
}

const updateUserComplaint = async (req, res) => {
    const {
        body: { description },
        user: { userId },
        params: { id: complaintId },
    } = req

    if (description === '') {
        throw new BadRequestError('Please fill in description')
    }
    const complaint = await Complaint.findByIdAndUpdate({ _id: complaintId, createdBy: userId }, req.body, { new: true, runValidators: true })
    if (!complaint) {
        throw new NotFoundError('complaint not found')
    }
    res.status(StatusCodes.OK).json({ complaint })
}

const deleteComplaint = async (req, res) => {
    const { user: { userId }, params: { id: complaintId } } = req

    const complaint = await Complaint.findByIdAndRemove({
        _id: complaintId,
        createdBy: userId
    })

    if (!complaint) {
        throw new NotFoundError('Complaint not found')
    }

    const officer = await Officer.findOne({ _id: complaint.officerID })

    if (officer) {
        officer.complaints = officer.complaints.filter((complaintId) => {
            return complaintId.toString() !== this._id.toString();
        });
        await officer.save();
    }
    else {
        console.log('no officer has the complaint')
    }

    res.status(StatusCodes.OK).json({ complaint })

}

module.exports = { getAllTasks };