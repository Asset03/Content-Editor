const { log } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const filePath = path.join(__dirname, "data", "en.json");
app.get("/read-file", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.send(data);
    }
  });
});

app.post("/write-file", (req, res) => {
  const data = req.body.data;
  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Changed");
    }
  });
});

app.listen(3000, () => {
  console.log("Server on port 3000...");
});
