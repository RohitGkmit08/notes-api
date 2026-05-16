const Note = require('../models/note.model');
const User = require('../models/user.model');

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

const shareNote = async (noteId, ownerId, email) => {
  
  const userToShare = await User.findOne({ email });
  if (!userToShare) {
    throw new Error('User not found');
  }

  if (userToShare._id.toString() === ownerId.toString()) {
    throw new Error('You cannot share a note with yourself');
  }

  // Find the note and make sure the requester is the owner
  const note = await Note.findOne({ _id: noteId, owner: ownerId });
  if (!note) {
    throw new Error('Note not found');
  }

  // Check if already shared
  if (note.sharedWith.includes(userToShare._id)) {
    throw new Error('Note is already shared with this user');
  }

  // Add user to sharedWith array
  note.sharedWith.push(userToShare._id);
  await note.save();

  return note;
};
module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote, shareNote };