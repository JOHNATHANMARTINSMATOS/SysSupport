const express = require('express');
const router = express.Router();
const db = require('../models');
const Suggestion = db.Suggestion;

// Listar todas as sugestões
router.get('/', async (req, res) => {
  try {
    const suggestions = await Suggestion.findAll();
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar uma nova sugestão
router.post('/', async (req, res) => {
  const { title, category, description } = req.body;
  try {
    const newSuggestion = await Suggestion.create({ title, category, description });
    res.status(201).json(newSuggestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar uma sugestão
router.put('/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findByPk(req.params.id);
    if (suggestion) {
      await suggestion.update(req.body);
      res.json(suggestion);
    } else {
      res.status(404).json({ message: 'Sugestão não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar uma sugestão
router.delete('/:id', async (req, res) => {
  try {
    const suggestion = await Suggestion.findByPk(req.params.id);
    if (suggestion) {
      await suggestion.destroy();
      res.json({ message: 'Sugestão removida com sucesso!' });
    } else {
      res.status(404).json({ message: 'Sugestão não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
