const express = require("express");
const fs = require("fs");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
  const newData = JSON.stringify(req.body.data, null, 2);
  fs.writeFile(filePath, newData, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("changed");
    }
  });
});

app.listen(3000, () => {
  console.log("Server on port 3000...");
});
