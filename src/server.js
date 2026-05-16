require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Notes API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 