const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('../models');
const routes = require('../routes');
const errorHandler = require('../middleware/errorHandler');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });
