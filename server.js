const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/syssupport';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Importando as rotas
const errorRoutes = require('./routes/errors');
const manualRoutes = require('./routes/manuals');
const scriptRoutes = require('./routes/scripts');
const regimeRoutes = require('./routes/regimes');
const suggestionRoutes = require('./routes/suggestions');
const cstRoutes = require('./routes/cst');
const cfopRoutes = require('./routes/cfop');
const ipiRoutes = require('./routes/ipi');
const cofinsRoutes = require('./routes/cofins');
const pisRoutes = require('./routes/pis');
const instructionRoutes = require('./routes/instructions');

// Registrando as rotas
app.use('/api/errors', errorRoutes);
app.use('/api/manuals', manualRoutes);
app.use('/api/scripts', scriptRoutes);
app.use('/api/regimes', regimeRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/cst', cstRoutes);
app.use('/api/cfop', cfopRoutes);
app.use('/api/ipi', ipiRoutes);
app.use('/api/cofins', cofinsRoutes);
app.use('/api/pis', pisRoutes);
app.use('/api/instructions', instructionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
