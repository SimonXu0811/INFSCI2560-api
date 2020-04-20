const User = require('../Models/Users');
const config = require('../config');
const orderHistory = require('../Models/OrderHistory');
const jwt = require('jsonwebtoken');
const Items = require('../Models/Items');


exports.authorize = ({username, password}, callback) => {
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, false, {message: 'username ' + username + ' not found'});
        }
        user.verifyPassword(password, function (err, result) {
            if (result) {
                const token = jwt.sign({sub: user._id, role: user.role}, config.secret);
                const newUser = {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    token: token
                };
                return callback(null, newUser);
            } else {
                return callback(null, false, {message: 'Invaild username and password'});
            }
        })
    })
};

exports.signup = (user, callback) => {
    User.findOne({username: user.username}, (err, exist) => {
        if (err) {
            return callback(err);
        }
        if (exist) {
            return callback(null, null)
        }

        const newUser = new User({
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            role: 'User'
        });

        newUser.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, newUser);
        });
    });
};

exports.submitOrder = (username, items, callback) => {
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return callback(err);
        }
        if(!user) {
            return callback(null, null)
        }

        const newOrderHistory = new orderHistory({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            items: items,
            status: 'Pending'
        });

        for (let t in items) {
            Items.updateOne({_id: t._id}, {
                quantity: this.quantity - t.quantity
            });
        }

        newOrderHistory.save((err, order) => {
            if (err) {
                return callback(err);
            }
            return callback(null, newOrderHistory);
        });
    })
};

exports.getAllUserInfo = (username, callback) => {
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return callback(err);
        }
        if (!user) {
            return callback(null, null);
        }
        return callback(null, user);
    });
};

exports.updateUserInfo = (username, newUser, callback) => {
    User.updateOne({username: username}, {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address: newUser.address,
        phonenumber: newUser.phonenumber
    }, (err, message) => {
        if (err) {
            return callback(err);
        }
        if (message) {
            return callback(null, {message: 'User has been updated!'})
        }
    })
};

exports.getOrderHistory = (username, callback) => {
    orderHistory.find({username: username}, (err, OrderHistory) => {
        if (err) {
            return callback(err);
        } else if (!OrderHistory) {
            return callback(null, null);
        }
        return callback(null, OrderHistory);
    })
};