const Joi = require("@hapi/joi");
const { AllowedProtocols } = require("../../helpers/enums")

exports.addUrlCheck = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  protocol:  Joi.string().valid(...Object.values(AllowedProtocols)).required(),
  path: Joi.string().optional(),
  port: Joi.string().optional(),
  webhook: Joi.string().optional(),
  timeout: Joi.number().optional(),
  interval: Joi.number().optional(),
  threshold: Joi.number().optional(),
  httpHeaders: Joi.array().items(
    Joi.object({
      key: Joi.string().required(),
      value: Joi.string().required(),
    }),
  ).optional()
});

exports.editUrlCheck = Joi.object({
  name: Joi.string().optional(),
  url: Joi.string().optional(),
  protocol:  Joi.string().valid(...Object.values(AllowedProtocols)).optional(),
  path: Joi.string().optional(),
  port: Joi.string().optional(),
  webhook: Joi.string().optional(),
  timeout: Joi.number().optional(),
  interval: Joi.number().optional(),
  threshold: Joi.number().optional(),
  httpHeaders: Joi.array().items(
      Joi.object({
      key: Joi.string().required(),
      value: Joi.string().required(),
    }),
  ).optional()
});