// Import Express.js
const express = require("express");
const path = require("path");
const app = express();
// const newNote = require(`./routes/newNote`);
// const savedNote = require(`./routes/savedNote`);
const api = require(`./routes/notes`);

const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/api/notes`, api);

app.use(express.static("public"));
// app.use(`/api/newNote`, newNote);
// app.use(`/api/savedNote`, savedNote);

app.get(`/index`, (req, res) =>
  res.sendFile(path.join(__dirname, `/public/index.html`))
);

app.get(`/notes`, (req, res) =>
  res.sendFile(path.join(__dirname, `/public/notes.html`))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
