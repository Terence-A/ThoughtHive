const express = require("express");
const routes = require("./controllers");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/thoughtHive", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}....`);
});
