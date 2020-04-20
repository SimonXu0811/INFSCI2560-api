const userService = require('../Services/userService');

exports.authorize = (req, res) => {
    userService.authorize(req.body, (err, user, message) => {
        if (err) {
            res.status(401).send(err);
        } else if (user) {
            res.send(user);
        } else {
            res.status(401).send(message);
        }
    });
};

exports.signup = (req, res) => {
    userService.signup(req.body, (err, user) => {
        if (err) {
            res.status(401).send(err);
        } else if (!user) {
            res.status(401).json({message: 'User already exists!'})
        } else {
            res.send(user);
        }
    });
};

exports.submitOrder = (req, res) => {
    userService.submitOrder(req.params.username, req.body, (err, OrderHistory) => {
        if (err) {
            res.status(401).send(err);
        } else if (!OrderHistory) {
            res.status(401).json({message: 'User cannot be found!'})
        } else {
            res.send(OrderHistory);
        }
    })
};

exports.getAllUserInfo = (req, res) => {
    userService.getAllUserInfo(req.params.username, (err, user) => {
        if (err) {
            res.status(401).send(err);
        } else if (!user) {
            res.status(401).json({message: 'User cannot be found!'})
        } else {
            res.send(user);
        }
    })
};

exports.updateUserInfo = (req, res) => {
    userService.updateUserInfo(req.params.username, req.body, (err, message) => {
        if (err) {
            res.status(401).send(err);
        } else if (!message) {
            res.status(401).json({message: 'User cannot be found!'})
        } else {
            res.status(202).send(message);
        }
    })
};

exports.getOrderHistory = (req, res) => {
    userService.getOrderHistory(req.params.username, (err, orderHistory) => {
        if (err) {
            res.status(401).send(err);
        } else if (!orderHistory) {
            res.status(401).send({message: "No orders are found!"});
        } else {
            res.send(orderHistory);
        }
    })
};

