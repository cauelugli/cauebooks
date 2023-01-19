const router = require("express").Router();
const Categories = require("../models/Categories");

//GET CATEGORIES
router.get("/:id", async (req, res) => {
  try {
    const post = await Categories.find(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE CATEGORY
router.post("/", async (req, res) => {
  const newCategory = new Categories(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
