const express = require('express');
const router = express.Router();
const CST = require('../models/cst.model');

// Listar todos os CSTs
router.get('/', async (req, res) => {
    try {
        const csts = await CST.find();
        res.json(csts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar um novo CST
router.post('/', async (req, res) => {
    const { code, description } = req.body;
    const newCST = new CST({
        code,
        description
    });
    try {
        const savedCST = await newCST.save();
        res.status(201).json(savedCST);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar um CST
router.put('/:id', async (req, res) => {
    try {
        const updatedCST = await CST.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCST);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar um CST
router.delete('/:id', async (req, res) => {
    try {
        await CST.findByIdAndDelete(req.params.id);
        res.json({ message: 'CST removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
