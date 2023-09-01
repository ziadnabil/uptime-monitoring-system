const express = require('express');
const router = express.Router();
const controller = require('../authentication/controller')
const { userAuth } = require('../../../middleware/auth')
const { request } = require('chai');
const Validator = require('../../../middleware/validator')

router.post('/register', Validator('registerUser','body'),controller.register)
router.post('/changePassword',   userAuth(request), Validator('changePass', 'body'), controller.changePassword)
router.put('/disable', userAuth(request), controller.disableAccount)

module.exports = router