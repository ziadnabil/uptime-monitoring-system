const Push = require('pushover-notifications');

// Create a Pushover client with your API token
const push = new Push({
  user: process.env.PUSHOVER_USER,
  token: process.env.PUSHOVER_TOKEN,
});

async function sendPushoverNotification(userKey, message) {
  const msg = {
    message: message,
    title: 'Uptime Monitor',
    sound: 'magic',
  };

  push.send(msg, userKey, (err, result) => {
    if (err) {
      console.error('Pushover notification failed:', err);
    } else {
      console.log('Pushover notification sent successfully:', result);
    }
  });
}

module.exports = {
    sendPushoverNotification,
};