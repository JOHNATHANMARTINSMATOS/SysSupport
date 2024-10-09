const express = require('express');
const router = express.Router();
const db = require('../models');
const Regime = db.Regime;

// Listar todos os regimes
router.get('/', async (req, res) => {
  try {
    const regimes = await Regime.findAll();
    res.json(regimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo regime
router.post('/', async (req, res) => {
  const { title, category, description } = req.body;
  try {
    const newRegime = await Regime.create({ title, category, description });
    res.status(201).json(newRegime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um regime
router.put('/:id', async (req, res) => {
  try {
    const regime = await Regime.findByPk(req.params.id);
    if (regime) {
      await regime.update(req.body);
      res.json(regime);
    } else {
      res.status(404).json({ message: 'Regime não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um regime
router.delete('/:id', async (req, res) => {
  try {
    const regime = await Regime.findByPk(req.params.id);
    if (regime) {
      await regime.destroy();
      res.json({ message: 'Regime removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Regime não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
