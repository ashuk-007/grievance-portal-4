const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')

const getUserDetails = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    res.status(StatusCodes.OK).json({ user })
}

const updateUserDetails = async (req, res) => {
    const {
        body: { description },
        user: { userId }
    } = req

    if (description === '') {
        throw new BadRequestError('Please fill in description')
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true, runValidators: true })


    res.status(StatusCodes.OK).json({ user })
}

module.exports = { updateUserDetails, getUserDetails }