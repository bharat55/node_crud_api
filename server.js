const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
