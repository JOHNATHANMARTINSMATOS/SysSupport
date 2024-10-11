const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require('sequelize');
const Error = db.Error;

router.get('/', async (req, res) => {
    const { category, subcategory, description } = req.query;
    const filters = {};
    
    if (category) filters.category = { [Op.eq]: category };
    if (subcategory) filters.subcategory = { [Op.eq]: subcategory };
    if (description) filters.description = { [Op.like]: `%${description}%` };

    try {
        const errors = await db.Error.findAll({ where: filters });
        res.json(errors);
    } catch (error) {
        console.error('Erro ao buscar erros:', error);
        res.status(500).json({ message: 'Erro ao buscar erros.' });
    }
});

// Rota para listar categorias e subcategorias únicas
router.get('/categories', async (req, res) => {
    try {
        // Obtenha categorias únicas
        const categories = await db.Error.findAll({
            attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('category')), 'category']],
            where: {
                category: { [Op.ne]: null }  // Exclui valores nulos
            }
        });

        res.json(categories.map(c => c.category));
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        res.status(500).json({ message: 'Erro ao carregar categorias.' });
    }
});

router.get('/subcategories', async (req, res) => {
    const { category } = req.query;
    try {
        // Obtenha subcategorias únicas, filtrando por categoria, se fornecido
        const whereClause = category ? { category } : {};

        const subcategories = await db.Error.findAll({
            attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('subcategory')), 'subcategory']],
            where: {
                ...whereClause,
                subcategory: { [Op.ne]: null } // Exclui valores nulos
            }
        });

        res.json(subcategories.map(s => s.subcategory));
    } catch (error) {
        console.error('Erro ao carregar subcategorias:', error);
        res.status(500).json({ message: 'Erro ao carregar subcategorias.' });
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
