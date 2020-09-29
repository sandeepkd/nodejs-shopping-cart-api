var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
    title:  { type: String, required: true},
    logo: { type: String, unique: true, required: true},
    short_description: { type: String},
    bgcolor: { type: String, required: true},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Template', TemplateSchema);