const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        requird: true,

    },
    price: {
        type: String,
        requird: true, 
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        requird: true, 
    },
    is_drink: {
        type: Boolean,
        default:false,
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;  