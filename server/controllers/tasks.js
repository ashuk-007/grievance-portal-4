const Complaint = require('../models/Complaint')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const User = require('../models/User')
const Officer = require('../models/Officer')

const getAllTasks = async (req, res) => {

    // console.log(req.officer);
    //{ officerID: req.officer.officerId }
    const tasks = await Complaint.find({ officerID: req.officer.officerId }).sort('createdAt')
    // console.log(tasks)
    res.status(StatusCodes.OK).json({ count: tasks.length, tasks })
}

const getTask = async (req, res) => {
    const { params: { id: complaintId } } = req

    const complaint = await Complaint.findOne({ _id: complaintId })
    if (!complaint) {
        throw new NotFoundError('Complaint not found')
    }
    res.status(StatusCodes.OK).json({ complaint })
}

//updateTask


const updateTask = async (req, res) => {
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

module.exports = { getAllTasks, getTask };