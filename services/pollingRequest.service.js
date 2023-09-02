const cron = require('node-cron');
const axios = require('axios');
const db = require('../models/index')
const notifyService = require('./notifications.service');

async function pollUrlCheck(check) {
  try {
    const response = await axios.get(check.url, {
      headers: check.httpHeaders || {},
      timeout: check.timeout * 1000,
    });

    // Update the status and responseTime in the database
    await db.Check.update(
      {
        status: 'up',
        responseTime: response.headers['x-response-time'],
      },
      { where: { id: check.id } }
    );

    // Check if it was previously down and send an "up" notification
    if (check.status === 'down') {
      notifyService.send_notification_to.user.system_is_up(user, check);
    }
  } catch (error) {
    // Handle errors, mark as down, and send a notification
    console.error('Polling error:', error);
    // Update the status in the database
    await db.Check.update(
      {
        status: 'down',
      },
      { where: { id: check.id } }
    );
    // Send a "down" notification
    notifyService.send_notification_to.user.system_is_down(user, check);
}
}

// Schedule polling for all URL checks at their specified intervals
async function schedulePolling() {
  const checks = await db.Check.findAll();

  checks.forEach(check => {
    cron.schedule(`*/${check.interval} * * * *`, () => {
      console.log(`Running polling for check: ${check.name}`);
      pollUrlCheck(check);
    });
  });
}

module.exports = {
    schedulePolling,
};