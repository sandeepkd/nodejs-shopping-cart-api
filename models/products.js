var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    prod_name:  { type: String, required: true},
    cat_id:  { type: String, required: true},
    short_description:  { type: String, required: true},
    description: { type: String},
    price_per_kg:  { type: Number, default: 0.00},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Product', ProductSchema);