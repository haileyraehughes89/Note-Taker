// Import Express.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.static("public"));

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));

app.get("/notes(.html)?", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "notes.html"))
);

app.get("/api/notes(.html)?", (req, res) =>
  res.sendFile(path.join(__dirname, "db.json"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
