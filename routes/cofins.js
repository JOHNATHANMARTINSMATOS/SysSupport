const express = require('express');
const router = express.Router();
const COFINS = require('../models/cofins.model'); // Verifique se o caminho do modelo está correto

// Listar todos os COFINS
router.get('/', async (req, res) => {
    try {
        const cofins = await COFINS.find();
        res.json(cofins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo COFINS
router.post('/', async (req, res) => {
    const { code, description, rate } = req.body;
    const newCOFINS = new COFINS({
        code,
        description,
        rate
    });
    try {
        const savedCOFINS = await newCOFINS.save();
        res.status(201).json(savedCOFINS);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um COFINS
router.put('/:id', async (req, res) => {
    try {
        const updatedCOFINS = await COFINS.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCOFINS);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um COFINS
router.delete('/:id', async (req, res) => {
    try {
        await COFINS.findByIdAndDelete(req.params.id);
        res.json({ message: 'COFINS removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
