const expressJWT = require('express-jwt');
const { secret } = require('../config');

function authorize (roles= []) {
    if (typeof roles == 'string') {
        roles = [roles];
    }

    return [
        expressJWT({secret}), (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({message: "User Unauthorized"});
            }
            next();
    }
    ]
}

module.exports = authorize;