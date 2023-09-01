const admin = require('./firebaseSDK');

const log_error = (e) => { if (process.env.NODE_ENV !== 'production') console.error(e); } // prettier-ignore

module.exports = {
  sendNotificationTo: async (
    token, 
    notification,
    data = {}, 
  ) => {
    if (token == null || token?.length == 0) {
      console.debug('invalid token');
      return;
    }

    const message = {
      notification,
      data,
    };

    const multiple_devices = token instanceof Array;
    if (multiple_devices) {
      // send to multiple devices
      message.tokens = token;
      admin.messaging().sendMulticast(message).then(console.debug).catch(log_error); // prettier-ignore
    } else {
      // send to single device
      message.token = token;
      admin.messaging().send(message).then(console.debug).catch(log_error);
    }
  },
};