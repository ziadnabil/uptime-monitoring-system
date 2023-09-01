const db = require('../models/index');
const { sendNotificationTo } = require('../config/firebase');

const getNotifications = async (userId, userType, { page, limit }) => {
  const result = await db.Notification.findAndCountAll({
    attributes: ['id', 'notification', 'data', 'createdAt'],
    where: {
      userId,
      userType,
    },
    order: [['id', 'DESC']],
    limit,
    offset: (page - 1) * limit,
  });

  return {
    items: result.rows,
    total_count: result.count,
  };
};

const deleteNotification = async (userId, userType, notificationId) => {
  return db.Notification.destroy({
    where: {
      userId,
      userType,
      id: notificationId,
    },
  });
};

//#region send_fcm_to-util
// prettier-ignore
const send_save_notif_to = ({ token, userType, userId, type, body, entity_id, entity_type }) => {
  const notification = {
    title: 'Monitoring system',
    body,
  };

  const data = {
    type,
    entity_id: (entity_id ?? userId).toString(),
    entity_type:  entity_type?? userType,
  };

  // save to db
  db.Notification.create({
    userId,
    userType,
    notification,
    data,
  })
    .then()
    .catch(console.error);

  // send to firebase
  sendNotificationTo(token, notification, data).then().catch(console.error);
};

get_params = (userType, user, checkUrl) => ({
  userType,
  checkUrl,
  token: user.deviceToken,
  userId: user.id,
});

const get_account_notifications = (userType, checkUrl) => ({
  //#region account
  registered: (user) =>
    send_save_notif_to({
      ...get_params(userType, user),
      type: `${userType}_registered`,
      body: 'Your account has been registered successfully',
    }),
  account_disabled: (user) =>
    send_save_notif_to({
      ...get_params(userType, user),
      body: 'Your account has been disabled',
      type: `${userType}_account_disabled`,
    }),
  system_is_up: (user) =>
    send_save_notif_to({
      ...get_params(userType, user, checkUrl),
      body: 'Your url is up now',
      type: `${checkUrl}_is_working_now`,
    }),
  system_is_down: (user) =>
    send_save_notif_to({
      ...get_params(userType, user, checkUrl),
      body: 'Your url is down now',
      type: `${checkUrl}_is_down_now`,
    }),
  //#endregion account
});

const user_notifications = {
  ...get_account_notifications('user'),
};

const send_notification_to = {
  user: user_notifications,
};

class NotificationsService {
  constructor() {
    this.send_notification_to = send_notification_to;
    this.getNotifications = getNotifications;
    this.deleteNotification = deleteNotification;
  }
}

module.exports = new NotificationsService();