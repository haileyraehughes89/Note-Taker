const express = require("express");
const path = require(`path`);
const savedNote = express.Router();
const fs = require(`fs`);
const util = require(`util`);
const uuid = require(`../helpers/uuid`);

savedNote.get(`/`, (req, res) => {
  const noteId = req.params.noteId;

  readFromFile(`./db.json`).then((data) => {
    const notes = JSON.parse(data);
    const selectedNote = notes.find((note)=> note.note_id === noteId);

    if (selectedNote) {
      res.json(selectedNote);
    } else {
      console.error(err);
      res.json(notes);
    }
  });
});
savedNote.post("/", (req, res) => {
  console.log(req.body);

  const { text, title } = req.body;

  if (req.body) {
    const savedNote = {
      title,
      text,
      note_id: uuid(),
    };
    writeToFile(savedNote, "./db.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = savedNote;
