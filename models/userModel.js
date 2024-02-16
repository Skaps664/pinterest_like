const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/pinterestApp");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
    },
  ],
  dp: String, // Assuming dp is a link to the user's display picture
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: String,
});

userSchema.plugin(plm);
module.exports = mongoose.model("userModel", userSchema);
