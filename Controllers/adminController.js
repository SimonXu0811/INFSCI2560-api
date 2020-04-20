const adminService = require('../Services/adminService');
const User = require('../Models/Users');


exports.changeRole = (req, res, callback) => {
    User.updateOne({username: req.params.username},
        {role: req.params.role},
        (err, message) => {
            if (err) {
                return callback(err);
            } else if (message) {
                return res.status(202).json({message: "Role has been changed!"});
            }
        })
};

exports.changeOrderHistory = (req, res) => {
    adminService.changeOrderHistory(req.params._id, req.body, (err, message) => {
        if (err) {
            res.status(401).send(err);
        }
        else if (!message) {
            res.status(401).send({message: 'No orders are found!'});
        } else {
            res.status(202).send(message);
        }
    })
};

exports.addItems = (req, res) => {
    adminService.addItems(req.body, (err, newItem) => {
        if (err) {
            res.status(401).send(err);
        }else if (!newItem) {
            res.status(401).send({message: 'Cannot add this new Item'});
        } else {
            res.send(newItem);
        }
    })
};

exports.updateItem = (req, res) => {
    adminService.updateItem(req.params._id, req.body, (err, message) => {
        if (err) {
            res.status(401).send(err);
        }
        else if (!message) {
            res.status(401).send({message: 'Cannot find item'});
        }
        else {
            res.status(202).send(message);
        }
    })
};

exports.deleteItem = (req, res) => {
    adminService.deleteItem(req.params._id, (err, item) => {
        if (err) {
            res.status(401).send(err);
        }
        else if (!item) {
            res.status(401).send({message: 'Cannot find item'});
        }
        else {
            res.status(200).send({message: 'Item has been deleted!'});
        }
    })
};




