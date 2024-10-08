const express = require('express');
const router = express.Router();
const IPI = require('../models/ipi.model');

// Listar todos os IPIs
router.get('/', async (req, res) => {
    try {
        const ipis = await IPI.find();
        res.json(ipis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo IPI
router.post('/', async (req, res) => {
    const { code, description, rate } = req.body;
    const newIPI = new IPI({
        code,
        description,
        rate
    });
    try {
        const savedIPI = await newIPI.save();
        res.status(201).json(savedIPI);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um IPI
router.put('/:id', async (req, res) => {
    try {
        const updatedIPI = await IPI.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedIPI);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um IPI
router.delete('/:id', async (req, res) => {
    try {
        await IPI.findByIdAndDelete(req.params.id);
        res.json({ message: 'IPI removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
