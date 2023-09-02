const express = require('express');
const router = express.Router();
const Validator = require('../middleware/validator');
const controller = require('../controller/public');
const { deviceRateLimiter } = require('../middleware/deviceTokenBlocker')

router.post('/user/login',  Validator('loginUserSchema','body'), controller.userLogin) // prettier-ignore
router.post('/sendEmailWithCode', deviceRateLimiter(request), Validator('sendCode','body'), controller.sendCode) // prettier-ignore
router.post('/validateCode',  Validator('validateCode','body'), controller.validateCode) // prettier-ignore
router.post('/users/forgetPassSendOTP', deviceRateLimiter(request), Validator('sendCode','body'), controller.forgetPassSendOTP) // prettier-ignore
router.post('/users/resetPassword',  Validator('usersResetPassword','body'), controller.usersResetPassword) // prettier-ignore

module.exports = router;