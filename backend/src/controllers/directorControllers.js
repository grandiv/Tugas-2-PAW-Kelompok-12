const Director = require("../models/directorModels");

exports.createDirector = async (req, res) => {
  const { name, desc, birth, images, movies } = req.body;
  const director = new Director({
    name,
    desc,
    birth,
    images,
    movies,
  });
  try {
    await director.save();
    res.status(201).json("Create Director Success!");
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director)
      return res.status(404).json({
        message: "Director not found",
      });
    res.status(200).json({
      message: "Director deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director)
      return res.status(400).json({
        message: "Director not found",
      });
    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateDirector = async (req, res) => {
  try {
    const updatedDirector = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDirector)
      return res.status(404).json({
        message: "Director not found",
      });
    res.status(200).json(updatedDirector);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
