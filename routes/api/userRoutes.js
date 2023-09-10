const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("User Get request reached");
});

module.exports = router;
