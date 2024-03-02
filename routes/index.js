var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
var passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index", { title: "Pinterest" });
});
router.get("/signup", function (req, res) {
  res.render("signup");
});
router.get("/login", function (req, res) {
  res.render("login", { error: req.flash("error") });
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render("profile", { user });
});

router.get("/feed", isLoggedIn, function (req, res, next) {
  res.render("feed");
});

// router.get("/createuser", async function (req, res, next) {
//   let createdUser = await userModel.create({
//     username: "Skaps",
//     password: "hehe",
//     posts: [],
//     email: "msudaisk664@gmail.com",
//     fullName: "Omer khan",
//   });
//   res.send(createdUser);
// });

// router.get("/createpost", async function (req, res, next) {
//   let createdPost = await postModel.create({
//     postText: "This is first test post",
//     user: "65e2cd63d5f1c71c7b25c84e",
//   });
//   let user = await userModel.findOne({ _id: "65e2cd63d5f1c71c7b25c84e" });
//   user.posts.push(createdPost._id);
//   user.save();
//   res.send("done");
// });

router.post("/signup", function (req, res) {
  const { username, email, fullName } = req.body;
  const userData = new userModel({
    username,
    email,
    fullName,
  });
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/login");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
