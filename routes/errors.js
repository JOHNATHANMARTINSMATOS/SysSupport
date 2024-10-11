const express = require('express');
const router = express.Router();
const db = require('../models');
const Error = db.Error;
router.get('/', async (req, res) => {
    const { category, subcategory, description } = req.query;
    const filters = {};
    
    // Ajuste os filtros conforme os parâmetros recebidos
    if (category) filters.categoryId = category;
    if (subcategory) filters.subcategoryId = subcategory;
    if (description) filters.description = { [Op.like]: `%${description}%` };

    try {
        const errors = await db.Error.findAll({
            where: filters,
            include: [
                { model: db.Category, as: 'category' },
                { model: db.Subcategory, as: 'subcategory' }
            ]
        });
        res.json(errors);
    } catch (error) {
        console.error('Erro ao buscar erros:', error);
        res.status(500).json({ message: 'Erro ao buscar erros.' });
    }
});
router.get('/categories', async (req, res) => {
    try {
        const categories = await db.Category.findAll({
            include: [{ model: db.Subcategory, as: 'subcategories' }]
        });
        res.json(categories);
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        res.status(500).json({ message: 'Erro ao carregar categorias.' });
    }
});


// Carregar erro por ID
router.get('/:id', async (req, res) => {
    try {
        const error = await Error.findByPk(req.params.id);
        if (error) res.json(error);
        else res.status(404).json({ message: 'Erro não encontrado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Editar erro
router.put('/:id', async (req, res) => {
    try {
        const error = await Error.findByPk(req.params.id);
        if (error) {
            await error.update(req.body);
            res.json({ message: 'Erro atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Erro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Excluir erro
router.delete('/:id', async (req, res) => {
    try {
        const error = await Error.findByPk(req.params.id);
        if (error) {
            await error.destroy();
            res.json({ message: 'Erro excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Erro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
