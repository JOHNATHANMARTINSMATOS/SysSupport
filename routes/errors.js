const express = require('express');
const router = express.Router();
const db = require('../models');
const Error = db.Error;
const upload = require('../middleware/upload');

// Listar todos os erros
router.get('/', async (req, res) => {
  try {
    const errors = await Error.findAll();
    res.json(errors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar um novo erro com upload de imagem
router.post('/', upload.single('image'), async (req, res) => {
  const { title, category, subcategory, description, responsible, resolutionDate } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await Error.create({
      title,
      category,
      subcategory,
      description,
      responsible,
      resolutionDate,
      image
    });
    
    res.status(201).json({ message: 'Erro cadastrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um erro existente
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, category, subcategory, description, responsible, resolutionDate } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  try {
    const error = await Error.findByPk(req.params.id);
    if (error) {
      await error.update({
        title,
        category,
        subcategory,
        description,
        responsible,
        resolutionDate,
        image
      });
      res.json({ message: 'Erro atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Erro não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar um erro existente
router.delete('/:id', async (req, res) => {
  try {
    const error = await Error.findByPk(req.params.id);
    if (error) {
      await error.destroy();
      res.json({ message: 'Erro removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Erro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
