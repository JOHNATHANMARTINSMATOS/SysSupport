const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('/uploads'));

const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados PostgreSQL e sincronizar tabelas
db.sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao PostgreSQL');
    return db.sequelize.sync();
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });

// Servindo a página inicial
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Importando e registrando as rotas
const routes = ['errors', 'manuals', 'scripts', 'suggestions', 'cst', 'cfop', 'ipi', 'cofins', 'pis', 'instructions'];
routes.forEach(route => {
  app.use(`/api/${route}`, require(`./routes/${route}`));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
