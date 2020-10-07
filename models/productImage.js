var mongoose = require('mongoose');

var ProductImageSchema = new mongoose.Schema({
    prod_id:  { type: String, required: true},
    image_name:  { type: String, required: true},
    alt_tag:  { type: String},
    featured:  { type: Boolean, default: false},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('ProductImage', ProductImageSchema);