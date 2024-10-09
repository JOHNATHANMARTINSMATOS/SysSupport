const express = require('express');
const router = express.Router();
const db = require('../models');
const PIS = db.PIS;

// Listar todos os PIS
router.get('/', async (req, res) => {
  try {
    const pisList = await PIS.findAll();
    res.json(pisList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo PIS
router.post('/', async (req, res) => {
  const { code, description, rate } = req.body;
  try {
    const newPIS = await PIS.create({ code, description, rate });
    res.status(201).json(newPIS);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um PIS
router.put('/:id', async (req, res) => {
  try {
    const pis = await PIS.findByPk(req.params.id);
    if (pis) {
      await pis.update(req.body);
      res.json(pis);
    } else {
      res.status(404).json({ message: 'PIS não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um PIS
router.delete('/:id', async (req, res) => {
  try {
    const pis = await PIS.findByPk(req.params.id);
    if (pis) {
      await pis.destroy();
      res.json({ message: 'PIS removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'PIS não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
