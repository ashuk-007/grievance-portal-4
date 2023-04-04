const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/')
const Blacklist  = require('../models/Blacklist')

const register = async (req, res) => {

    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

}


const logout = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const checkIfBlacklisted = await Blacklist.findOne({token: token})
    if (checkIfBlacklisted){
        res.status(204).json({msg:'Session already logged out'})
    }
    const newBlacklist = new Blacklist({
        token:token,
    });
    await newBlacklist.save(); 
    res.status(200).json({msg:'Logged out successfully!'});
}


const login = async (req, res) => {
    //send the response
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

module.exports = { login, register, logout }

