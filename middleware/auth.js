const { decodeToken } = require('../models/utils');
const { extractToken } = require('./utils');
const db = require('../models/index');
const { UnexpectedError, Unauthorized , Forbidden } = require('../utils/Errors')

exports.userAuth = (request, response, next) => {
    return async function (request, response, next) {
        try {
            let token = extractToken(request.headers);
            let payload = await decodeToken(token);
            let userData = await db.User.findOne({ where: { id: payload.id, email: payload.email } });
            if (!userData) throw new Unauthorized()
            if (userData.disable == true) throw new Forbidden()
            request.userType = 'retailer'
            request.user = userData;
            next()
        }
            catch (error) {
                console.log("ERROR", error)
                if ([401, 403, 409].includes(error.httpStatus)) return next(error)
                next(new UnexpectedError());
            }
    }
};
