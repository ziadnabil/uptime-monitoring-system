const db = require('../../models/index')
const utils = require('../utils')
const { UnexpectedError } = require('../../utils/Errors')
const standardResponse = require('../../utils/standardResponse');

module.exports = {
    addUrlCheck: async (request, response, next) => {
        const { name, url, protocol, path, port, webhook, timeout, interval, threshold, httpHeaders } = request.body;
        const userId = request.user.id
        try {

            await db.Check.create({ name, url, protocol, path, port, webhook, timeout, interval, threshold, httpHeaders, userId })

            return standardResponse.success("Check created ", {}, response)
        }
        catch (error) {
            if ([404, 400, 409].includes(error.httpStatus)) return next(error)
            next(new UnexpectedError(error));
        }
    },
    editUrlCheckById: async (request, response, next) => {
      const { name, url, protocol, path, port, webhook, timeout, interval, threshold, httpHeaders } = request.body;
      const { checkId } = request.params;
      const userId = request.user.id
      try {
          const check = await utils.findOneEntryAndError({ id: checkId , userId }, 'Check')
      
          if(name) check.name = name;
          if(url) check.url = url;
          if(protocol) check.protocol = protocol;
          if(path) check.path = path;
          if(port) check.port = port;
          if(webhook) check.webhook = webhook;
          if(timeout) check.timeout = timeout;
          if(interval) check.interval = interval;
          if(threshold) check.threshold = threshold;
          if(httpHeaders) check.httpHeaders = httpHeaders;

          await check.save();
      
          return standardResponse.success("Check updated ", {}, response);
        } catch (error) {
          if ([404, 400, 409].includes(error.httpStatus)) return next(error);
          next(new UnexpectedError(error));
        }
    },
    deleteUrlCheckById: async (request, response, next) => {
        const { checkId } = request.params;
        const userId = request.user.id

        try {
          const check = await utils.findOneEntryAndError({ id: checkId , userId }, 'Check')
          await check.destroy();
      
          return standardResponse.success("Check deleted ", {}, response);
        } catch (error) {
          if ([404, 400, 409].includes(error.httpStatus)) return next(error);
          next(new UnexpectedError(error));
        }
    }
}