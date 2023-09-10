//imports
const express = require("express");
const routes = require("./routes/api");
const mongoose = require("mongoose");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Listen for server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
});
