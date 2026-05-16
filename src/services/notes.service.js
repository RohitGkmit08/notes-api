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

const getAllNotes = async (userId, query) => {
  const {
    search,
    tag,
    isPinned,
    isArchived,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
  } = query;

  const filter = {
    $or: [{ owner: userId }, { sharedWith: userId }],
  };

  if (search) {
    filter.$text = { $search: search };
  }

  if (tag) {
    filter.tags = tag.toLowerCase();
  }

  if (isPinned !== undefined) {
    filter.isPinned = isPinned === 'true';
  }

  if (isArchived !== undefined) {
    filter.isArchived = isArchived === 'true';
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOrder = order === 'desc' ? -1 : 1;

  const notes = await Note.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit));

  const total = await Note.countDocuments(filter);

  return {
    notes,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
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