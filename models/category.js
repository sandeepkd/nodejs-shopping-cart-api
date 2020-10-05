var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    cat_name:  { type: String, required: true},
    description: { type: String, unique: true, required: true},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Category', CategorySchema);