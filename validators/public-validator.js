const Joi = require("@hapi/joi");

exports.loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).max(25).required(),
  deviceToken: Joi.string().required(),
});

exports.forgetPasswordOTPSchema = Joi.object({
  phoneNumber: Joi.string().min(11).max(11).required(),
  nationalIdOrPassportNumber: Joi.string().required(),
});

exports.validateCode = Joi.object({
  email: Joi.string().required(),
  code: Joi.string().min(6).max(6).required(),
});

exports.usersResetPassword = Joi.object({
  email: Joi.string().required(),
  otp: Joi.string().min(6).max(6).required(),
  newPassword: Joi.string().min(8).max(25).required(),
});

exports.sendCode = Joi.object({
  email: Joi.string().required(),
});