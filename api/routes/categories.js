const router = require("express").Router();
const Categories = require("../models/Categories");

//GET CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
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

//GET SINGLE CATEGORY PAGE
// todo

module.exports = router;
