const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const notesRoutes = require('./notes.routes');

router.use('/', authRoutes);
router.use('/notes', notesRoutes);

module.exports = router;