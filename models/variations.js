var mongoose = require('mongoose');

var VariationSchema = new mongoose.Schema({
    product_id:  { type: String, required: true},
    amount_in_gm:  { type: Number, default: 0.00},
    price:  { type: Number, default: 0.00},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Variation', VariationSchema);