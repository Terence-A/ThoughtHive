const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Thought get request reached");
});
module.exports = router;
