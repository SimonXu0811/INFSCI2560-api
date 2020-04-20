const express = require('express');
const router = express.Router();
const authorize = require('../Authors/authorize');
const Role = require('../Authors/Roles');
const adminController = require('../Controllers/adminController');

router.put('/changeRole/:username/:role', authorize(Role.Admin), adminController.changeRole);

router.put('/changeOrderHistory/:_id', authorize(Role.Admin), adminController.changeOrderHistory);

router.post('/addItems', authorize(Role.Admin), adminController.addItems);

router.put('/updateItem/:_id', authorize(Role.Admin), adminController.updateItem);

router.delete('/deleteItem/:_id', authorize(Role.Admin), adminController.deleteItem);

module.exports = router;