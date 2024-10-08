const express = require('express');
const router = express.Router();
const Manual = require('../models/manual.model');
const upload = require('../middleware/upload');

// Listar todos os manuais
router.get('/', async (req, res) => {
    try {
        const manuals = await Manual.find();
        res.json(manuals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo manual
router.post('/', upload.single('file'), async (req, res) => {
    const { title, category, description } = req.body;
    const newManual = new Manual({
        title,
        category,
        description,
        file: req.file ? req.file.path : null
    });
    try {
        const savedManual = await newManual.save();
        res.status(201).json(savedManual);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um manual
router.put('/:id', async (req, res) => {
    try {
        const updatedManual = await Manual.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedManual);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um manual
router.delete('/:id', async (req, res) => {
    try {
        await Manual.findByIdAndDelete(req.params.id);
        res.json({ message: 'Manual removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
