const express = require('express');
const router = express.Router();
const CFOP = require('../models/cfop.model'); // Verifique se o caminho do modelo está correto

// Listar todos os CFOPs
router.get('/', async (req, res) => {
    try {
        const cfops = await CFOP.find();
        res.json(cfops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo CFOP
router.post('/', async (req, res) => {
    const { code, description } = req.body;
    const newCFOP = new CFOP({
        code,
        description
    });
    try {
        const savedCFOP = await newCFOP.save();
        res.status(201).json(savedCFOP);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um CFOP
router.put('/:id', async (req, res) => {
    try {
        const updatedCFOP = await CFOP.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCFOP);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um CFOP
router.delete('/:id', async (req, res) => {
    try {
        await CFOP.findByIdAndDelete(req.params.id);
        res.json({ message: 'CFOP removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
