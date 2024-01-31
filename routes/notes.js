const express = require('express');
const note = express.Router();
const { readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
note.get('/', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// POST Route for saving note
note.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object will save
    const newNote = {
    title,
    text
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in saving note');
  }
});

module.exports = note;