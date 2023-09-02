const db = require('../models/index');
const { UnexpectedError, InvalidCredentials } = require('../utils/Errors');
const standardResponse = require('../utils/standardResponse');
const { sendCodeToEmail } = require('../services/mail.service');
const utils = require('./utils');
const { hotp } = require('otplib');

module.exports = {
  sendCode: async (request, response, next) => {
    try {
      const email = request.body.email;

      // validate email syntax
      await utils.validateEmail(email);

      // check email if it exists or not
      await utils.checkEmail(email);

      //generate code
      const code = await utils.generateCode(email);
      await sendCodeToEmail(email, code, 'register');

      return standardResponse.success('email is sent ', {}, response);
    } catch (error) {
      if ([400, 401, 409].includes(error.httpStatus)) return next(error);
      next(new UnexpectedError());
    }
  },

  validateCode: async (request, response, next) => {
    try {
      let { code, email } = request.body;

      const isValid = hotp.check(code, email, new Date().getHours());
      if (!isValid) throw new InvalidCredentials();
      
      return standardResponse.success('valid code ', {}, response);
    } catch (error) {
      if ([400, 401, 409].includes(error.httpStatus)) return next(error);
      next(new UnexpectedError());
    }
  },

  userLogin: async (request, response, next) => {
    try {
      let { email, password, deviceToken } = request.body;
      let token;
      let data = {};

      await utils.validateEmail(email);

      let user = await db.User.findOne({ where: { email } });
      if (user) {
        if (user.disable) user.update({ disable: false });
        if (deviceToken) user.update({ deviceToken });
        let { updatedAt, createdAt, ...userData } = user.toJSON();
        token = await user.login(password);
        userData.password = undefined;
        data = userData;
      } else {
        throw new InvalidCredentials();
      }

      return standardResponse.success('logged in ', data, response);
    } catch (error) {
      if ([400, 401].includes(error.httpStatus)) return next(error);
      return next(new UnexpectedError());
    }
  },

  forgetPassSendOTP: async (request, response, next) => {
    try {
      let { email } = request.body;
      let user = await db.User.findOne({ where: { email } });

      if (user === null) throw new InvalidCredentials();

      const code = await utils.generateCode(email);
      await sendCodeToEmail(email, code, 'forgetPass');

      return standardResponse.success('otp sent ', {}, response);
    } catch (error) {
      if ([400, 401].includes(error.httpStatus)) return next(error);
      return next(new UnexpectedError());
    }
  },

  usersResetPassword: async (request, response, next) => {
    try {
      let { otp, newPassword, email } = request.body;

      let user = await db.User.findOne({ where: { email } });

      if (user === null) throw new InvalidCredentials();

      const isValid = hotp.check(otp, email, new Date().getHours());
      if (!isValid) throw new InvalidCredentials();

      if (user) await user.changePassword(newPassword);

      return standardResponse.success('password updated ', {}, response);
    } catch (error) {
      if ([400, 401].includes(error.httpStatus)) return next(error);
      return next(new UnexpectedError());
    }
  },
}