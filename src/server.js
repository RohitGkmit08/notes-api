require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connectDB();

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});