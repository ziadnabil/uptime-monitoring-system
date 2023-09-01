const db = require('../../../models/index');
const utils = require('../../utils');
const { UnexpectedError, BadRequest } = require('../../../utils/Errors');
const standardResponse = require('../../../utils/standardResponse');
// const notifyService = require('../../../services/notifications.service');

module.exports = {
  register: async (request, response, next) => {
    const { name, email, password, deviceToken } = request.body; // prettier-ignore
    try {
      await utils.validateEmail(email);
      await utils.checkEmail(email);

      const user = await db.User.create({ name, email, password, deviceToken }); // prettier-ignore
      const token = await user.login(password);

      user.password = undefined;
      const data = { token, user };

    //   notifyService.send_notification_to.user.registered(user);
      // TODO: send email
      return standardResponse.success('user created ', data, response);
    } catch (error) {
      if ([404, 400, 409].includes(error.httpStatus)) return next(error);
      next(new UnexpectedError(error));
    }
  },

  changePassword: async (request, response, next) => {
    try {
      const { oldPassword, newPassword } = request.body;
      const user = request.user;
      const checkPassword = await user.checkPassword(oldPassword);

      if (!checkPassword) return next(new BadRequest('invalid password'));
      await user.checkPassword(newPassword);
      await user.changePassword(newPassword);

      // TODO: send email
      return standardResponse.success('password changed ', {}, response);
    } catch (error) {
      if ([404, 400, 409].includes(error.httpStatus)) return next(error);
      next(new UnexpectedError());
    }
  },

  disableAccount: async (request, response, next) => {
    try {
      await request.user.update({ disable: true });

    //   notifyService.send_notification_to.user.account_disabled(req.user);
      // TODO: send email
      return standardResponse.success('disabled ', {}, response);
    } catch (error) {
      next(new UnexpectedError());
    }
  },
};
