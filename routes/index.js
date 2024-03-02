var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

router.get("/", function (req, res) {
  res.render("index", { title: "LEARNING" });
});

router.get("/createuser", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "Skaps",
    password: "hehe",
    posts: [],
    email: "msudaisk664@gmail.com",
    fullName: "Omer khan",
  });
  res.send(createdUser);
});

router.get("/createpost", async function (req, res, next) {
  let createdPost = await postModel.create({
    postText: "This is first test post",
    user: "65e2cd63d5f1c71c7b25c84e",
  });
  let user = await userModel.findOne({ _id: "65e2cd63d5f1c71c7b25c84e" });
  user.posts.push(createdPost._id);
  user.save();
  res.send("done");
});
module.exports = router;
