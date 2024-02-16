var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(
    "This is all a bunch of crap that i am listening right now and i really wanna kill him"
  );
});

module.exports = router;
