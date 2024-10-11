const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require('sequelize');
const upload = require('../middleware/upload');
const Manual = db.Manual;

// Listar manuais com filtros
router.get('/', async (req, res) => {
    const { category, description } = req.query;
    const filters = {};
    
    if (category) filters.category = { [Op.eq]: category };
    if (description) filters.description = { [Op.like]: `%${description}%` };

    try {
        const manuals = await Manual.findAll({ where: filters });
        res.json(manuals);
    } catch (error) {
        console.error('Erro ao buscar manuais:', error);
        res.status(500).json({ message: 'Erro ao buscar manuais.' });
    }
});

// Criar um novo manual com upload de arquivo (POST)
router.post('/', upload.single('file'), async (req, res) => {
    const { title, category, description } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await Manual.create({
            title,
            category,
            description,
            file
        });

        res.status(201).json({ message: 'Manual cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar manual:', error);
        res.status(400).json({ message: 'Erro ao cadastrar manual.' });
    }
});

// Listar categorias únicas
router.get('/categories', async (req, res) => {
    try {
        const categories = await Manual.findAll({
            attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('category')), 'category']],
            where: {
                category: { [Op.ne]: null } 
            }
        });

        res.json(categories.map(c => c.category));
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        res.status(500).json({ message: 'Erro ao carregar categorias.' });
    }
});

// Carregar manual por ID
router.get('/:id', async (req, res) => {
    try {
        const manual = await Manual.findByPk(req.params.id);
        if (manual) {
            res.json(manual);
        } else {
            res.status(404).json({ message: 'Manual não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar manual:', error);
        res.status(500).json({ message: 'Erro ao buscar manual.' });
    }
});

// Atualizar todas as informações de um manual específico
router.put('/:id', upload.single('file'), async (req, res) => {
    const { title, category, description } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : req.body.file;

    try {
        const manual = await Manual.findByPk(req.params.id);
        
        if (manual) {
            await manual.update({
                title,
                category,
                description,
                file
            });
            
            res.json({ message: 'Manual atualizado com sucesso!' });
        } else {
            res.status(404).json({ message: 'Manual não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar manual:', error);
        res.status(500).json({ message: 'Erro ao atualizar manual.' });
    }
});

// Excluir manual
router.delete('/:id', async (req, res) => {
    try {
        const manual = await Manual.findByPk(req.params.id);
        if (manual) {
            await manual.destroy();
            res.json({ message: 'Manual excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Manual não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir manual:', error);
        res.status(500).json({ message: 'Erro ao excluir manual.' });
    }
});

module.exports = router;
