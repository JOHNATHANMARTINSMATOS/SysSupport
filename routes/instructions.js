const express = require('express');
const router = express.Router();
const db = require('../models');
const Instruction = db.Instruction;

// Listar todas as instruções
router.get('/', async (req, res) => {
  try {
    const instructions = await Instruction.findAll();
    res.json(instructions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar uma nova instrução
router.post('/', async (req, res) => {
  const { title, category, description } = req.body;
  try {
    const newInstruction = await Instruction.create({ title, category, description });
    res.status(201).json(newInstruction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Atualizar uma instrução
router.put('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findByPk(req.params.id);
    if (instruction) {
      await instruction.update(req.body);
      res.json(instruction);
    } else {
      res.status(404).json({ message: 'Instrução não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar uma instrução
router.delete('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findByPk(req.params.id);
    if (instruction) {
      await instruction.destroy();
      res.json({ message: 'Instrução removida com sucesso!' });
    } else {
      res.status(404).json({ message: 'Instrução não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
