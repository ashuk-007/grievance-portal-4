const Officer = require('../models/Officer')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/')

const registerOfficer = async (req, res) => {

    try {
        const user = await Officer.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ error: error.message });
    }

}

module.exports = { registerOfficer }