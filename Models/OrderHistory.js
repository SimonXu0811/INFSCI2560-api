const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');

const OrderHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true
    },
    firstName: String,
    lastName: String,
    phonenumber: Number,
    address: String,
    items: {
        type: Array
    },
    status: {
        type: String
    }
});

OrderHistorySchema.pre('updateOne', function (next) {
    this.updatedAt = new Date();
    next();
});

OrderHistorySchema.plugin(timestamp, {
    disableUpdated: false
});

module.exports = mongoose.model('orderHistory', OrderHistorySchema);