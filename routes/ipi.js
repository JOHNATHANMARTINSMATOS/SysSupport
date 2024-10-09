const express = require('express');
const router = express.Router();
const db = require('../models');
const IPI = db.IPI;

// Listar todos os IPIs
router.get('/', async (req, res) => {
  try {
    const ipis = await IPI.findAll();
    res.json(ipis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo IPI
router.post('/', async (req, res) => {
  const { code, description, rate } = req.body;
  try {
    const newIPI = await IPI.create({ code, description, rate });
    res.status(201).json(newIPI);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um IPI
router.put('/:id', async (req, res) => {
  try {
    const ipi = await IPI.findByPk(req.params.id);
    if (ipi) {
      await ipi.update(req.body);
      res.json(ipi);
    } else {
      res.status(404).json({ message: 'IPI não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um IPI
router.delete('/:id', async (req, res) => {
  try {
    const ipi = await IPI.findByPk(req.params.id);
    if (ipi) {
      await ipi.destroy();
      res.json({ message: 'IPI removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'IPI não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
