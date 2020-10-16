var mongoose = require('mongoose');

var ShippingAddressSchema = new mongoose.Schema({
    user_id:  { type: String, required: true},
    fullname:  { type: String, required: true},
    address1: { type: String, required: true},
    address2: { type: String, default: null},
    city: { type: String, default: null},
    state: { type: String, default: null},
    country: { type: String, default: null},
    pincode: { type: String, required: true},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('shipppingAddress', ShippingAddressSchema);