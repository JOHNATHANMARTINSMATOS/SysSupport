const express = require('express');
const router = express.Router();
const db = require('../models');
const Error = db.Error;
const upload = require('../middleware/upload'); // Middleware para upload de arquivos

// Listar todos os erros
router.get('/', async (req, res) => {
  try {
    const errors = await Error.findAll();
    res.json(errors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para criar um novo erro com upload de imagem
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
    
    // Envia uma mensagem de sucesso
    res.status(201).json({ message: 'Erro cadastrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;


// Atualizar um erro
router.put('/:id', async (req, res) => {
  try {
    const error = await Error.findByPk(req.params.id);
    if (error) {
      await error.update(req.body);
      res.json({ message: 'Erro atualizado com sucesso!'});
    } else {
      res.status(404).json({ message: 'Erro não encontrado' });
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
      res.json({ message: 'Erro removido com sucesso!' });
    } else {
      res.status(404).json({ message: 'Erro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
