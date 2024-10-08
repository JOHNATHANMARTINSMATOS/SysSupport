const express = require('express');
const router = express.Router();
const Script = require('../models/script.model');

// Listar todos os scripts
router.get('/', async (req, res) => {
    try {
        const scripts = await Script.find();
        res.json(scripts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo script
router.post('/', async (req, res) => {
    const { title, category, subcategory, script } = req.body;
    const newScript = new Script({
        title,
        category,
        subcategory,
        script
    });
    try {
        const savedScript = await newScript.save();
        res.status(201).json(savedScript);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um script
router.put('/:id', async (req, res) => {
    try {
        const updatedScript = await Script.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedScript);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um script
router.delete('/:id', async (req, res) => {
    try {
        await Script.findByIdAndDelete(req.params.id);
        res.json({ message: 'Script removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
