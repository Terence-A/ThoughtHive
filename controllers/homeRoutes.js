const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Home route working!");
});

module.exports = router;
