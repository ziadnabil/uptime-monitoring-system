const express = require('express');
const router = express.Router();
const Validator = require('../middleware/validator');
const controller = require('../controller/public');

router.post('/user/login',  Validator('loginUserSchema','body'), controller.userLogin) // prettier-ignore
router.post('/sendEmailWithCode',  Validator('sendCode','body'), controller.sendCode) // prettier-ignore
router.post('/validateCode',  Validator('validateCode','body'), controller.validateCode) // prettier-ignore
router.post('/users/forgetPassSendOTP',  Validator('sendCode','body'), controller.forgetPassSendOTP) // prettier-ignore
router.post('/users/resetPassword',  Validator('usersResetPassword','body'), controller.usersResetPassword) // prettier-ignore

module.exports = router;