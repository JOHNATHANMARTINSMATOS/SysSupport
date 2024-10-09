const express = require('express');
const router = express.Router();
const db = require('../models');
const Error = db.Error;
const upload = require('../middleware/upload'); // Importa o middleware de upload

// Listar todos os erros
router.get('/', async (req, res) => {
  try {
    const errors = await Error.findAll();
    res.json(errors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Rota para criar um novo erro com upload de imagem
router.post('/', upload.single('image'), async (req, res) => {
    const { title, category, subcategory, description, responsible, resolutionDate } = req.body;
    const image = req.file ? req.file.path : null;
  
    try {
      const newError = await Error.create({
        title,
        category,
        subcategory,
        description,
        responsible,
        resolutionDate,
        image
      });
      res.status(201).json(newError);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Atualizar um erro
router.put('/:id', async (req, res) => {
  try {
    const error = await Error.findByPk(req.params.id);
    if (error) {
      await error.update(req.body);
      res.json(error);
    } else {
      res.status(404).json({ message: 'Error not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um erro
router.delete('/:id', async (req, res) => {
  try {
    const error = await Error.findByPk(req.params.id);
    if (error) {
      await error.destroy();
      res.json({ message: 'Error removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Error not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
