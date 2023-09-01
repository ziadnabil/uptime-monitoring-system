const express = require('express');
const router = express.Router();


const userAuthentication = require('../controller/user/authentication/router');
router.use('/user', userAuthentication);

const check = require('../controller/check/router');
router.use('/check', check);

const public = require('./public')

router.use(public)

module.exports = router