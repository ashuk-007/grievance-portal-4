const User = require('../models/User')
const Officer = require('../models/Officer')
const Admin = require('../models/Admin');
const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken')

function roleAuthenticationMiddleware (role){
    return async (req, res, next) => {
        // console.log('hi')
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.userId
        // console.log(userId)

        if (role == 'admin'){
            const user = await Admin.findById(userId)
            // console.log(user)
    
            if (!user) {
                throw new UnauthenticatedError("Unauthorized")
            }

            next()
        }
        else if (role == 'officer'){
            const user = await Officer.findById(userId)
            // console.log(user)
    
            if (!user) {
                throw new UnauthenticatedError("Unauthorized")
            }
            
            next()
        }
        else if (role == 'user'){
            const user = await User.findById(userId)
            // console.log(user)
    
            if (!user) {
                throw new UnauthenticatedError("Unauthorized")
            }

            next()
        }
        else{
            throw new UnauthenticatedError("Unauthorized")
        }
    }
}

module.exports = {roleAuthenticationMiddleware}