const router = require("express").Router();
const Post = require("../models/Post");
const HomePage = require("../models/HomePage");

const homePageId = "63e15e26fcfcb8bf1d89ff6c";

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    const homepage = await HomePage.find();
    res.status(200).json({ posts, homepage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    const updatedHomePage = await HomePage.findByIdAndUpdate(
      homePageId,
      {
        $push: {
          recentAdded: {
            title: savedPost.title,
            postId: savedPost._id,
            categories: savedPost.categories,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({savedPost, updatedHomePage});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE POST
router.put("/like/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    const updatedHomePage = await HomePage.findByIdAndUpdate(
      homePageId,
      {
        $set: {
          recentLiked: {
            title: updatedPost.title,
            categories: updatedPost.categories,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ updatedPost, updatedHomePage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UNLIKE POST
router.put("/unlike/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//FAVORITE POST
router.put("/favorite/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { favorites: 1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UNFAVORITE POST
router.put("/unfavorite/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { favorites: -1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//COMMENT POST
router.put("/comment/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          commentaries: {
            username: req.body.user.username,
            user_id: req.body.user.user_id,
            avatar: req.body.user.avatar,
            comment: req.body.comment,
            date: req.body.date,
            commentary_id: req.body.commentary_id,
          },
        },
      },
      { new: true }
    );
    const updatedHomePage = await HomePage.findByIdAndUpdate(
      homePageId,
      {
        $set: {
          recentCommented: {
            title: updatedPost.title,
            categories: updatedPost.categories,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ updatedPost, updatedHomePage });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST COMMENTARY
router.put("/delcomment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const commentIndex = post.commentaries.findIndex(
      (c) => c.commentary_id === req.body.commentary_id
    );
    if (commentIndex !== -1) {
      post.commentaries.splice(commentIndex, 1);
      await post.save();
      res.status(200).json();
    } else {
      res.status(404).json();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
