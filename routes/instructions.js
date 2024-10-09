const express = require('express');
const router = express.Router();
const Instruction = require('../models/instruction.model'); // Verifique se o caminho do modelo está correto

// Listar todas as instruções
router.get('/', async (req, res) => {
    try {
        const instructions = await Instruction.find();
        res.json(instructions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar uma nova instrução
router.post('/', async (req, res) => {
    const { title, category, description } = req.body;
    const newInstruction = new Instruction({
        title,
        category,
        description
    });
    try {
        const savedInstruction = await newInstruction.save();
        res.status(201).json(savedInstruction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Atualizar uma instrução
router.put('/:id', async (req, res) => {
    try {
        const updatedInstruction = await Instruction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedInstruction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deletar uma instrução
router.delete('/:id', async (req, res) => {
    try {
        await Instruction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Instrução removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
