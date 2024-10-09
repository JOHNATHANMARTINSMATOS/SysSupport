const express = require('express');
const router = express.Router();
const db = require('../models');
const CFOP = db.CFOP;

// Listar todos os CFOPs
router.get('/', async (req, res) => {
  try {
    const cfops = await CFOP.findAll();
    res.json(cfops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo CFOP
router.post('/', async (req, res) => {
  const { code, description } = req.body;
  try {
    const newCFOP = await CFOP.create({ code, description });
    res.status(201).json(newCFOP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um CFOP
router.put('/:id', async (req, res) => {
  try {
    const cfop = await CFOP.findByPk(req.params.id);
    if (cfop) {
      await cfop.update(req.body);
      res.json(cfop);
    } else {
      res.status(404).json({ message: 'CFOP not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um CFOP
router.delete('/:id', async (req, res) => {
  try {
    const cfop = await CFOP.findByPk(req.params.id);
    if (cfop) {
      await cfop.destroy();
      res.json({ message: 'CFOP removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'CFOP not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
