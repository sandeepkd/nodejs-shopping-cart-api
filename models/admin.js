var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
    fullname:  { type: String, required: true},
    email: { type: String, unique: true, required: true},
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    role: { type: String, required: true},
    created_at: { type: Date, default: Date.now }
    }, { timestamp: true}
);

module.exports = mongoose.model('Admin', AdminSchema);