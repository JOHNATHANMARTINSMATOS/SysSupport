const express = require('express');
const router = express.Router();
const Error = require('../models/error.model');
const upload = require('../middleware/upload');

// Listar todos os erros
router.get('/', async (req, res) => {
    try {
        const errors = await Error.find();
        res.json(errors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo erro
router.post('/', upload.single('image'), async (req, res) => {
    const { title, category, subcategory, description, responsible, resolutionDate } = req.body;
    const newError = new Error({
        title,
        category,
        subcategory,
        description,
        responsible,
        resolutionDate,
        image: req.file ? req.file.path : null
    });
    try {
        const savedError = await newError.save();
        res.status(201).json(savedError);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um erro
router.put('/:id', async (req, res) => {
    try {
        const updatedError = await Error.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedError);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um erro
router.delete('/:id', async (req, res) => {
    try {
        await Error.findByIdAndDelete(req.params.id);
        res.json({ message: 'Erro removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
