const express = require('express');
const router = express.Router();
const Suggestion = require('../models/suggestion.model');

// Listar todas as sugestões
router.get('/', async (req, res) => {
    try {
        const suggestions = await Suggestion.find();
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar uma nova sugestão
router.post('/', async (req, res) => {
    const { title, category, description } = req.body;
    const newSuggestion = new Suggestion({
        title,
        category,
        description
    });
    try {
        const savedSuggestion = await newSuggestion.save();
        res.status(201).json(savedSuggestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar uma sugestão
router.put('/:id', async (req, res) => {
    try {
        const updatedSuggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSuggestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar uma sugestão
router.delete('/:id', async (req, res) => {
    try {
        await Suggestion.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sugestão removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
