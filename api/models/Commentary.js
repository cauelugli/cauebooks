const mongoose = require("mongoose");

const CommentarySchema = new mongoose.Schema(
  {
    user: {
      type: Array,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commentary", CommentarySchema);
