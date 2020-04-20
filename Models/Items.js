const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        lowercase: true
    },
    picture: {
        type: String
    }
});

module.exports = mongoose.model('items', ItemSchema);