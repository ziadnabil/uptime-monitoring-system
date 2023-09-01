//* Include all validators
const Validators = require('../validators')
const ValidationError = require('../utils/errorValidation');

module.exports = function(validator, validate) {
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    if(!validate)
    throw new Error(`you must choose validate body or query or params`)

    return async function(req, res, next,) {
        try {
            let validated;
            switch(validate) {
                case 'body':
                    validated = await Validators[validator].validateAsync(req.body, { abortEarly: false })
                    req.body = validated 
                  break;
                case 'query':
                    validated = await Validators[validator].validateAsync(req.query, { abortEarly: false })
                    req.query = validated 
                  break;
                  case 'params':
                    validated = await Validators[validator].validateAsync(req.params, { abortEarly: false })
                    req.params = validated 
                  break;
              }

            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            let errorMsg = {};
            errorMsg.message = err.details.map((val) => val.message);
            return next(new ValidationError(errorMsg.message, 400, 0, 'ValidationError'));
        }
    }
}

