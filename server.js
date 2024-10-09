const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');
require('dotenv').config();

const app = express();
// Adicionando o Helmet com configurações de Content Security Policy
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],           // Permitir carregamento de recursos do mesmo domínio
        fontSrc: ["'self'", "https://fonts.gstatic.com"] // Permitir fontes de URLs específicas
      }
    }
  }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

// Conectar ao banco de dados PostgreSQL
db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Servindo a página inicial
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Importando e registrando as rotas
const routes = ['errors', 'manuals', 'scripts', 'regimes', 'suggestions', 'cst', 'cfop', 'ipi', 'cofins', 'pis', 'instructions'];
routes.forEach(route => {
  app.use(`/api/${route}`, require(`./routes/${route}`));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
