const Joi = require("@hapi/joi");

exports.registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(25).required(),
  deviceToken: Joi.string().optional(),
});

exports.changePass = Joi.object({
  oldPassword: Joi.string().min(8).max(25).required(),
  newPassword: Joi.string().min(8).max(25).required(),
});