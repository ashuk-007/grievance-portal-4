const User = require('../models/User')
const Officer = require('../models/Officer')
const Admin = require('../models/Admin');
const { UnauthenticatedError } = require('../errors');

function roleAuthenticationMiddleware (role){
    return async (req, res, next) => {
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.userId

        if (role.includes('admin')){
            const user = await Admin.findById(userId)
    
            if (!user) {
                throw new UnauthenticatedError("Unauthorized")
            }

            next()
        }
        else if (role.includes('officer')){
            const user = await Officer.findById(userId)
    
            if (!user) {
                throw new UnauthenticatedError("Unauthorized")
            }
            
            next()
        }
        else if (role.includes('user')){
            const user = await User.findById(userId)
    
            if (!user) {
                throw new UnauthenticatedError("Unauthorized")
            }

            next()
        }
        else{
            throw new UnauthenticatedError("Unauthorized")
        }
    };
}

module.exports = {roleAuthenticationMiddleware}