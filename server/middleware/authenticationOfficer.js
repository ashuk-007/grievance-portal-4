const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/')

const auth = (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to the routes
        // console.log(payload);
        req.officer = { officerId: payload.userId, name: payload.name }
        next()

    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid hai')
    }

}

module.exports = auth