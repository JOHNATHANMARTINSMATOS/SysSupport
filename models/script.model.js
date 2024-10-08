const mongoose = require('mongoose');

const ScriptSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    script: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Script', ScriptSchema);
