const { Unauthorized } = require('../utils/Errors')

exports.extractToken = (header) => {
    if (!header['authorization']) { throw new Unauthorized('no authorization provided') }
    let token = header['authorization'].split(" ")[1]
    if (!token) { return next(new Unauthorized('No authorization provided')) }
    return token
}