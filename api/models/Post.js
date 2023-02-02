const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    likes: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    },
    commentaries: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
