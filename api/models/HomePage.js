const mongoose = require("mongoose");

const HomePageSchema = new mongoose.Schema(
  {
    recentLiked: {
      type: Array,
    },
    recentCommented: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomePage", HomePageSchema);
