const Officer = require('../models/Officer')
const Admin = require('../models/Admin')
const OfficerRatings = require('../models/OfficerRatings')
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
    res.status(StatusCodes.OK).json({ count: officers.length, officers })
}


module.exports = { registerOfficer, getAdminDetails, getOfficerData, deleteOfficer }