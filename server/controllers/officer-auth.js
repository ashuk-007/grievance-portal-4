const Officer = require('../models/Officer')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/')


const officerLogin = async (req, res) => {
    //send the response
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await Officer.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid credentials. User Not Found.');
    }


    const isPasswordCorrect = await user.comparePassword(password)


    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials. Password incorrect. ');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
    // res.status(StatusCodes.OK).json({ user, token })

}

// const officerRegister = async (req, res) => {

//     const user = await Officer.create({ ...req.body })
//     const token = user.createJWT()
//     res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

// }

module.exports = { officerLogin }
