const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const authorize = require('../Authors/authorize');
const Role = require('../Authors/Roles');

router.post('/login', userController.authorize);

router.post('/signup', userController.signup);

router.post('/submitOrder/:username', authorize(Role.User), userController.submitOrder);

router.get('/AllUserInfo/:username', authorize(Role.User), userController.getAllUserInfo);

router.put('/updateUserInfo/:username', authorize(Role.User), userController.updateUserInfo);

router.get('/orderHistory/:username', authorize(Role.User), userController.getOrderHistory);

module.exports = router;
