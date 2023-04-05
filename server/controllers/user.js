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
        user: { userId },
        params: { id: Id },
    } = req

    if (userId != Id) {
        throw new UnauthenticatedError('You are not permitted to edit this user')
    }

    if (description === '') {
        throw new BadRequestError('Please fill in description')
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true, runValidators: true })

    if (!user) {
        throw new NotFoundError('User not found')
    }

    res.status(StatusCodes.OK).json({ user })
}

module.exports = { updateUserDetails, getUserDetails }