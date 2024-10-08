const mongoose = require('mongoose');

const ErrorSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    description: { type: String, required: true },
    responsible: { type: String },
    resolutionDate: { type: Date },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Error', ErrorSchema);
