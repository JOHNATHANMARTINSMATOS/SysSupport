const express = require('express');
const router = express.Router();
const db = require('../models');
const Script = db.Script;

// Listar todos os scripts
router.get('/', async (req, res) => {
  try {
    const scripts = await Script.findAll();
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo script
router.post('/', async (req, res) => {
  const { title, category, subcategory, script } = req.body;
  try {
    const newScript = await Script.create({ title, category, subcategory, script });
    res.status(201).json(newScript);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um script
router.put('/:id', async (req, res) => {
  try {
    const scriptEntry = await Script.findByPk(req.params.id);
    if (scriptEntry) {
      await scriptEntry.update(req.body);
      res.json(scriptEntry);
    } else {
      res.status(404).json({ message: 'Script não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um script
router.delete('/:id', async (req, res) => {
  try {
    const scriptEntry = await Script.findByPk(req.params.id);
    if (scriptEntry) {
      await scriptEntry.destroy();
      res.json({ message: 'Script removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Script não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
