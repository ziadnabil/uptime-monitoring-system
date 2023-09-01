const express = require('express');
const router = express.Router();
const controller = require('../check/controller')
const { userAuth } = require('../../middleware/auth')
const { request } = require('chai');
const Validator = require('../../middleware/validator')


router.get('/getAllChecks',  userAuth(request), controller.addUrlCheck)
router.post('/addUrlCheck',  userAuth(request), Validator('addUrlCheck', 'body'), controller.addUrlCheck)
router.put('/editUrlCheck/:checkId',  userAuth(request), Validator('editUrlCheck', 'body'), controller.editUrlCheckById)
router.delete('/deleteUrlCheck/:checkId',  userAuth(request),  controller.deleteUrlCheckById)

module.exports = router