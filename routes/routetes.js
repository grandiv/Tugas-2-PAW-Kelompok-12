const express = require("express");
const router = express.Router();
const Tes = require("../models/tes");

// Creating One
router.post("/", async (req, res) => {
  const tes = new Tes({
    name: req.body.name,
    age: req.body.age,
    birthday: req.body.birthday,
  });

  try {
    const newTes = await tes.save();
    res.status(201).json(newTes); // 201 means successfully created a new object
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 means there's an error in the user input
  }
});

// Getting All
router.get("/", async (req, res) => {
  try {
    const tes = await Tes.find();
    res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 means there's an error in the database
  }
});

// Getting One
router.get("/:id", getTes, (req, res) => {
  res.json(res.tes);
});

// Updating One (uses patch instead of put because we only want to
// update the fields that are provided by the user)
router.patch("/:id", getTes, async (req, res) => {
  if (req.body.name != null) {
    res.tes.name = req.body.name;
  }
  if (req.body.age != null) {
    res.tes.age = req.body.age;
  }
  try {
    const updatedTes = await res.tes.save();
    res.json(updatedTes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getTes, async (req, res) => {
  try {
    await Tes.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Tes" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getTes(req, res, next) {
  let tes;
  try {
    tes = await Tes.findById(req.params.id);
    if (tes == null) {
      return res.status(404).json({ message: "Cannot find tes" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.tes = tes;
  next();
}

module.exports = router;
