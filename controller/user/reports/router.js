const express = require('express');
const router = express.Router();
const controller = require('../reports/controller')
const { userAuth } = require('../../../middleware/auth')
const { request } = require('chai');

router.get('/upTimeReport', userAuth(request),controller.userDetailedUptimeReport)

module.exports = router