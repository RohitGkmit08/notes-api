const Note = require('../models/note.model');

const createNote = async (userId, data) => {
  const note = await Note.create({
    title: data.title,
    content: data.content,
    tags: data.tags || [],
    isPinned: data.isPinned || false,
    isArchived: data.isArchived || false,
    owner: userId,
  });
  return note;
};

const getAllNotes = async (userId) => {
  const notes = await Note.find({
    $or: [{ owner: userId }, { sharedWith: userId }],
  }).sort({ createdAt: -1 });
  return notes;
};

const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    $or: [{ owner: userId }, { sharedWith: userId }],
  });
  return note;
};

const updateNote = async (noteId, userId, data) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId },
    { $set: data },
    { new: true, runValidators: true }
  );
  return note;
};

const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({
    _id: noteId,
    owner: userId,
  });
  return note;
};

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };