const express = require('express');
const router = express.Router();
const db = require('../models');
const Manual = db.Manual;

// Listar todos os manuais
router.get('/', async (req, res) => {
  try {
    const manuals = await Manual.findAll();
    res.json(manuals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo manual
router.post('/', async (req, res) => {
  const { title, category, description, file } = req.body;
  try {
    const newManual = await Manual.create({ title, category, description, file });
    res.status(201).json(newManual);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um manual
router.put('/:id', async (req, res) => {
  try {
    const manual = await Manual.findByPk(req.params.id);
    if (manual) {
      await manual.update(req.body);
      res.json(manual);
    } else {
      res.status(404).json({ message: 'Manual não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um manual
router.delete('/:id', async (req, res) => {
  try {
    const manual = await Manual.findByPk(req.params.id);
    if (manual) {
      await manual.destroy();
      res.json({ message: 'Manual removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Manual não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
