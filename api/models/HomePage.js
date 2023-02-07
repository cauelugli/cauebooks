const mongoose = require("mongoose");

const HomePageSchema = new mongoose.Schema(
  {
    recentLiked: {
      type: Array,
    },
    recentCommented: {
      type: Array,
    },
    recentAdded: {
      type: Array,
    },
    lastUpdate: {
      type: Array,
    },
    nextUpdate: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomePage", HomePageSchema);
