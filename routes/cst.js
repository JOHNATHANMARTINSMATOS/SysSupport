const express = require('express');
const router = express.Router();
const db = require('../models');
const CST = db.CST;

// Listar todos os CSTs
router.get('/', async (req, res) => {
  try {
    const csts = await CST.findAll();
    res.json(csts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo CST
router.post('/', async (req, res) => {
  const { code, description } = req.body;
  try {
    const newCST = await CST.create({ code, description });
    res.status(201).json(newCST);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um CST
router.put('/:id', async (req, res) => {
  try {
    const cst = await CST.findByPk(req.params.id);
    if (cst) {
      await cst.update(req.body);
      res.json(cst);
    } else {
      res.status(404).json({ message: 'CST not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um CST
router.delete('/:id', async (req, res) => {
  try {
    const cst = await CST.findByPk(req.params.id);
    if (cst) {
      await cst.destroy();
      res.json({ message: 'CST removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'CST not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
