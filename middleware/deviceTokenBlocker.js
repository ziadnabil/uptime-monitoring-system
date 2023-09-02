const { findOneEntryOrNull } = require('../controller/utils.js')
const db = require('../models/index');
const { UnexpectedError, BadRequest } = require('../utils/Errors')
const adminSDK = require('../config/firebaseSDK');
const { numberOfTrials } = require("../constants/rateLimiterConfig");

// A middlware to secure high value public apis that can be spammed by any mobile phone or device
exports.deviceRateLimiter = (request, response, next) => {
    return async function (request, response, next) {
        try {
            const IP = request.ip
            const requestUrl = request.route.path
            const currentTime = new Date();
            const year = currentTime.getFullYear();
            const month = String(currentTime.getMonth() + 1).padStart(2, '0');
            const day = String(currentTime.getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;

            let getDeviceToken = await request.header('x_device_token');
            if(getDeviceToken === undefined) throw new BadRequest('invalid information')

            const message = {
                notification: {
                  title: '',
                  body: '',
                },
            };
            
            // check if device token is valid
            const resp = await adminSDK.messaging().sendToDevice(getDeviceToken, message)
            if(resp.failureCount === 1) throw new BadRequest('invalid device token')

            const deviceToken = await findOneEntryOrNull({ deviceToken: getDeviceToken }, 'DeviceRateLimiter')
            if(deviceToken === null) {
                await db.DeviceRateLimiter.create({ deviceToken: getDeviceToken, requestUrl, createdDate: currentDate, IP})
                return next()
            }

            if(deviceToken){
                const todayDeviceToken = await findOneEntryOrNull({ deviceToken: getDeviceToken, createdDate: currentDate }, 'DeviceRateLimiter')
                if(todayDeviceToken){
                    const updatedAt = todayDeviceToken.updatedAt;
                    const timeDifference = currentTime - updatedAt;
                    const calculate24HR = 24 * 60 * 60 * 1000

                    if(timeDifference <= calculate24HR && todayDeviceToken.trials >= numberOfTrials.sendOTPTrials) throw new BadRequest('you can not perform this action')

                    if(timeDifference <= calculate24HR && todayDeviceToken.trials < numberOfTrials.sendOTPTrials) {
                        // More than 24 hours have passed, increment the count
                        todayDeviceToken.trials++;
                        await todayDeviceToken.save();
                    }
                }
                else{
                    await db.DeviceRateLimiter.create({ deviceToken: getDeviceToken, requestUrl, createdDate: currentDate, IP})
                    return next()
                }
            }
            return next()
        } catch (error) {
            console.log("error", error)
            if ([401, 400].includes(error.httpStatus)) return next(error)
            next(new UnexpectedError(error));
        }
    }
};