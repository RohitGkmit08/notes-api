const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  shareNote,
} = require('../controllers/notes.controller');

router.use(protect);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.post('/:id/share', shareNote);

module.exports = router;