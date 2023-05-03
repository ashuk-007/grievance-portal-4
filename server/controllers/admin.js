const Officer = require('../models/Officer')
const Admin = require('../models/Admin')
const OfficerRatings = require('../models/OfficerRatings')
const Complaint = require('../models/Complaint')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/')

const registerOfficer = async (req, res) => {

    try {
        const admin = await Admin.findOne({ _id: req.admin.adminId })
        req.body.district = admin.district;
        const user = await Officer.create({ ...req.body });
        const token = user.createJWT();
        await OfficerRatings.create({
            OfficerId: user._id,
            avgRating: null,
            ratings: [],
        })
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ error: error.message });
    }

}

const deleteOfficer = async (req, res) => {

    try {
        const officer = await Officer.findOne({ _id: req.params.id })
        if (!officer) {
            throw new BadRequestError('No officer found')
        }
        await Officer.deleteOne({ _id: req.params.id })
        await OfficerRatings.deleteOne({ OfficerId: req.params.id })
        res.status(StatusCodes.OK).json({ msg: 'Officer deleted' })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}


const getAdminDetails = async (req, res) => {

    const admin = await Admin.findOne({ _id: req.admin.adminId })

    res.status(StatusCodes.OK).json({ admin })

}

const getOfficerData = async (req, res) => {
    const admin = await Admin.findOne({ _id: req.admin.adminId })
    const officers = await Officer.find({ district: admin.district })
    data = [];
    for (let i = 0; i < officers.length; i++) {
        let officer = officers[i]

        let tasks = await Complaint.find({ officerID: officer._id })

        let pendingcnt = 0
        let inprocesscnt = 0
        let resolvedcnt = 0
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].status === 'pending') pendingcnt++;
            else if (tasks[j].status === 'in process') inprocesscnt++;
            else resolvedcnt++;
        }

        let rating = await OfficerRatings.findOne({ OfficerId: officer._id })
        // console.log(pendingcnt, inprocesscnt, resolvedcnt, rating.avgRating)
        data.push({
            name: officer.name,
            email: officer.email,
            department: officer.department,
            level: officer.level,
            avgRating: rating.avgRating,
            pendingCount: pendingcnt,
            inProcessCount: inprocesscnt,
            resolvedCount: resolvedcnt,
            _id: officer._id
        })
    }

    res.status(StatusCodes.OK).json({ count: data.length, data })
}


module.exports = { registerOfficer, getAdminDetails, getOfficerData, deleteOfficer }