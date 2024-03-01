var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

router.get("/", function (req, res) {
  res.render("index", { title: "SKPAS" });
});

router.get("/createuser", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "Skaps",
    password: "hehe",
    posts: [],
    email: "msudaisk664@gmail.com",
    fullName: "Sudais khan",
  });
  res.send(createdUser);
});

module.exports = router;
