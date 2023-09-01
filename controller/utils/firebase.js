const adminSDK = require('../../config/firebaseSDK');

module.exports={
    sendNotificationToUsers : async (tokens, notificationTitle, notificationBody, data={}) => {
        
      message = {
        notification: {
          title: notificationTitle,
          body: notificationBody,
        },
        data:data
      }
      try {
        response = await adminSDK.messaging().sendToDevice(tokens, message)
        return response;
        } catch (error) {
        throw error
        }
    }   
}
