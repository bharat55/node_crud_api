const express = require("express");
require("dotenv").config();
const connectDb = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
app.use(express.json());
connectDb();
app.use("/api/users", userRoutes);
// app.use("/api/posts", "./routes/postRoutes");

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
