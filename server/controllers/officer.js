const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')
const Officer = require('../models/Officer')
const OfficerRatings = require('../models/OfficerRatings')

const getOfficerDetails = async (req, res) => {
    const officer = await Officer.findOne({ _id: req.officer.officerId })
    const officerRating = await OfficerRatings.findOne({ OfficerId: req.officer.officerId })

    res.status(StatusCodes.OK).json({ officer, officerRating })
}

const updateOfficerDetails = async (req, res) => {
    const {
        body: { description },
        officer: { officerId }
    } = req

    if (description === '') {
        throw new BadRequestError('Please fill in description')
    }

    const officer = await Officer.findByIdAndUpdate({ _id: officerId }, req.body, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ officer })
}

module.exports = { updateOfficerDetails, getOfficerDetails }