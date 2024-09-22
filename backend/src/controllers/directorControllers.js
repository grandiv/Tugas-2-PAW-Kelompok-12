const Director = require("../models/directorModels");

const addDirector = async (req, res) => {
  const { name, desc, birth, images } = req.body;

  try {
    const newDirector = new Director({
      name,
      desc,
      birth,
      images,
    });

    await newDirector.save();
    res.status(201).json({ message: "Director added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDirector = async (req, res) => {
  res.json(res.director);
};

const updateDirector = async (req, res) => {
  if (req.body.name != null) {
    res.director.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.director.desc = req.body.desc;
  }
  if (req.body.birth != null) {
    res.director.birth = {
      date: req.body.birth.date || res.director.birth.date,
      country: req.body.birth.country || res.director.birth.country,
    };
  }
  if (req.body.images != null) {
    res.director.images = req.body.images;
  }

  try {
    const updatedDirector = await res.director.save();
    res.json(updatedDirector);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDirector = async (req, res) => {
  try {
    await Director.deleteOne({ _id: res.director._id });
    res.json({ message: "Director deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addDirector,
  getAllDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
};
