var mongoose = require('mongoose');

var CampaignSchema = new mongoose.Schema({
    title:  { type: String, required: true},
    short_description: { type: String, unique: true, required: true},
    user_id: { type: String, unique: true, required: true},
    status: { type: String, required: true},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Campaign', CampaignSchema);