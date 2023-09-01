const httpStatusCodes = require('./statusCodes')
const statusJson = require('../utils/status.json');

module.exports = {
    success: async (message, data, response) => {
        return  await response.status(httpStatusCodes.OK).json({
            status: statusJson.success,
            message: `${message}successfully`,
            data: data
        })
    },
};