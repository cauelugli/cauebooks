const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

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
    number: {
      type: Number,
      required: true,
      unique: true,
      autoIncrement: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
    commentaries: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(autoIncrement.plugin, {
  model: "Post",
  field: "number",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("Post", PostSchema);
