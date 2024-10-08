const mongoose = require('mongoose');

const ManualSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    file: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Manual', ManualSchema);
