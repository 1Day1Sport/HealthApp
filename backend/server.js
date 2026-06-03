require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', app: '1Day1Sport API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => console.log('API prête sur le port ' + PORT));
  })
  .catch((err) => {
    console.error('Erreur MongoDB:', err.message);
    process.exit(1);
  });
