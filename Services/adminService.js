const orderHistory = require('../Models/OrderHistory');
const Item = require('../Models/Items');

exports.changeOrderHistory = (_id, OrderHistory, callback) => {
    orderHistory.updateOne({_id: _id}, {
        firstName: OrderHistory.firstName,
        lastName: OrderHistory.lastName,
        phonenumber: OrderHistory.phonenumber,
        address: OrderHistory.address,
        items: OrderHistory.items,
        status: OrderHistory.status
    }, (err, message) => {
        if (err) {
            return callback(err);
        } else if (!message) {
            return callback(null, null);
        } else {
            return callback(null, {message: 'Order number ' + _id + ' has been updated！'});
        }
    })
};

exports.addItems = (item, callback) => {
    const newItem = new Item({
        name: item.name,
        quantity: item.quantity,
        description: item.description,
        price: item.price,
        category: item.category,
        picture: item.picture
    });
    newItem.save((err) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, item);
        }
    })
};

exports.updateItem = (id, item, callback) => {
    Item.updateOne({_id: id}, {
        name: item.name,
        quantity: item.quantity,
        description: item.description,
        price: item.price,
        category: item.category,
        picture: item.picture
    }, (err, message) => {
        if (err) {
            return callback(err);
        }else if (!message) {
            return callback(null, null);
        } else {
            return callback(null, {message: item.name + " has been updated"})
        }
    })
};

exports.deleteItem = (id, callback) => {
    Item.deleteOne({_id: id}, (err, message) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, {message: id + ' has been deleted'});
        }
    })
};