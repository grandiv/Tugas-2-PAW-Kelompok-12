const Director = require("../models/directorModels");

async function getOneDirector(req, res, next) {
  let director;
  try {
    director = await Director.findById(req.params.id);
    if (director == null) {
      return res.status(404).json({ message: "Cannot find director" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.director = director;
  next();
}

module.exports = { getOneDirector };
