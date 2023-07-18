const express = require("express");
const notes = express.Router();
const fs = require(`fs`);
const util = require(`util`);
const uuid = require(`../helpers/uuid`);

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
};

const readAndAppend = (content, file) => {
  fs.readFile(file, `utf8`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

notes.get(`/`, (req, res) => {
  readFromFile(`./db.json`).then((data) => {
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

notes.post("/", (req, res) => {
  console.log(req.body);

  const { text, title } = req.body;

  if (req.body) {
    const notes = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(notes, "./db.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

notes.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const notesData = await readFromFile("./db.json");
    const notes = JSON.parse(notesData);

    const noteIndex = notes.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      res.status(404).json({ message: "No note found with this ID!" });
    } else {
      notes.splice(noteIndex, 1);

      writeToFile("./db.json", notes);

      res.status(200).json({ message: "Note deleted successfully!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = notes;
