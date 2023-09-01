const statusjson = require('../utils/status.json');
const { BadRequest} = require('../utils/Errors')

const errorHandler = (err, request, response, next) => {
    let error = { ...err };
    error.message = err.message;undefined
    if (process.env.NODE_ENV !=="test") console.log(err)
    
    const errorlist = ['SequelizeUniqueConstraintError','SequelizeValidationError']
    if (errorlist.includes(`${err.name}`)) {

        const message = Object.values(err.errors)[0].message
        if (process.env.NODE_ENV !=="test") console.log(message);
        error = new BadRequest();
    }

    response.status(error.httpStatus || 500).json({
        status: error.status || statusjson.error,
        message: error.message || 'server error',
        extensionCode: error.extensionCode || 'Error'
    });
};

module.exports = errorHandler;