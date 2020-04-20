const express = require('express');
const router = express.Router();
const guestController = require('../Controllers/guestController');

router.get('/getAllItems', guestController.getAllItems);

router.get('/serachItems/:category/:name', guestController.searchItems);


module.exports = router;
