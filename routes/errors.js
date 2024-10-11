const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require('sequelize');
const upload = require('../middleware/upload');
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

// Criar um novo erro com upload de imagem (POST)
router.post('/', upload.single('image'), async (req, res) => {
    const { title, category, subcategory, description, responsible, resolutionDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await Error.create({
            title,
            category,
            subcategory,
            description,
            responsible,
            resolutionDate,
            image
        });

        res.status(201).json({ message: 'Erro cadastrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para listar categorias únicas
router.get('/categories', async (req, res) => {
    try {
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

// Rota para listar subcategorias únicas
router.get('/subcategories', async (req, res) => {
    try {
        const subcategories = await db.Error.findAll({
            attributes: [[db.Sequelize.fn('DISTINCT', db.Sequelize.col('subcategory')), 'subcategory']],
            where: {
                subcategory: { [Op.ne]: null }  // Exclui valores nulos
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

// Atualizar todas as informações de um erro específico
router.put('/:id', upload.single('image'), async (req, res) => {
    const { title, category, subcategory, description, responsible, resolutionDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    try {
        // Encontra o erro pelo ID
        const error = await Error.findByPk(req.params.id);
        
        if (error) {
            // Atualiza todas as informações
            await error.update({
                title,
                category,
                subcategory,
                description,
                responsible,
                resolutionDate,
                image
            });
            
            res.json({ message: 'Erro atualizado com sucesso!' });
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
