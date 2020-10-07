var mongoose = require('mongoose');

var OderSchema = new mongoose.Schema({
    product_id:  { type: String, required: true},
    user_id: { type: String, required: true},
    shipping_address_id:  { type: String, required: true},
    franchise_id:  { type: String, required: true},
    price:  { type: Number, default: 0.00},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Order', OderSchema);