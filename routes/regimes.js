const express = require('express');
const router = express.Router();
const Regime = require('../models/regime.model');

// Listar todos os regimes
router.get('/', async (req, res) => {
    try {
        const regimes = await Regime.find();
        res.json(regimes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo regime
router.post('/', async (req, res) => {
    const { title, category, description } = req.body;
    const newRegime = new Regime({
        title,
        category,
        description
    });
    try {
        const savedRegime = await newRegime.save();
        res.status(201).json(savedRegime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um regime
router.put('/:id', async (req, res) => {
    try {
        const updatedRegime = await Regime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRegime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um regime
router.delete('/:id', async (req, res) => {
    try {
        await Regime.findByIdAndDelete(req.params.id);
        res.json({ message: 'Regime removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
