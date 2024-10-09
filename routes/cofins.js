const express = require('express');
const router = express.Router();
const db = require('../models');
const COFINS = db.COFINS;

// Listar todos os COFINS
router.get('/', async (req, res) => {
  try {
    const cofins = await COFINS.findAll();
    res.json(cofins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo COFINS
router.post('/', async (req, res) => {
  const { code, description, rate } = req.body;
  try {
    const newCOFINS = await COFINS.create({ code, description, rate });
    res.status(201).json(newCOFINS);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um COFINS
router.put('/:id', async (req, res) => {
  try {
    const cofins = await COFINS.findByPk(req.params.id);
    if (cofins) {
      await cofins.update(req.body);
      res.json(cofins);
    } else {
      res.status(404).json({ message: 'COFINS not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um COFINS
router.delete('/:id', async (req, res) => {
  try {
    const cofins = await COFINS.findByPk(req.params.id);
    if (cofins) {
      await cofins.destroy();
      res.json({ message: 'COFINS removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'COFINS not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
