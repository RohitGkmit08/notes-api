const notesService = require('../services/notes.service');

const createNote = async (req, res) => {
  try {
    const note = await notesService.createNote(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const result = await notesService.getAllNotes(req.user._id, req.query);
    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: result.notes,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await notesService.getNoteById(req.params.id, req.user._id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Note retrieved successfully',
      data: note,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await notesService.updateNote(req.params.id, req.user._id, req.body);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await notesService.deleteNote(req.params.id, req.user._id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(204).json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const shareNote = async (req, res) => {
  try {
    const note = await notesService.shareNote(req.params.id, req.user._id, req.body.share_with_email);
    res.status(200).json({
      success: true,
      message: 'Note shared successfully',
      data: note,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote, shareNote };