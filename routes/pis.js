const express = require('express');
const router = express.Router();
const PIS = require('../models/pis.model');

// Listar todos os PIS
router.get('/', async (req, res) => {
    try {
        const pis = await PIS.find();
        res.json(pis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo PIS
router.post('/', async (req, res) => {
    const { code, description, rate } = req.body;
    const newPIS = new PIS({
        code,
        description,
        rate
    });
    try {
        const savedPIS = await newPIS.save();
        res.status(201).json(savedPIS);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um PIS
router.put('/:id', async (req, res) => {
    try {
        const updatedPIS = await PIS.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPIS);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um PIS
router.delete('/:id', async (req, res) => {
    try {
        await PIS.findByIdAndDelete(req.params.id);
        res.json({ message: 'PIS removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
