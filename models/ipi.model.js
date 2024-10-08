const mongoose = require('mongoose');

const IpiSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    rate: { type: Number, required: true },  // Campo para alíquota
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IPI', IpiSchema);
