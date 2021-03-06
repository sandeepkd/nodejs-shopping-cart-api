var mongoose = require('mongoose');

var productVariationSchema = new mongoose.Schema({
    prod_id:  { type: String, required: true},
    weight:  { type: String, required: true},
    price:  { type: String},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('productVariation', productVariationSchema); 