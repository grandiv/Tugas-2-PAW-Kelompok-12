const Movie = require("../models/movieModels");

async function getOneMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.movie = movie;
  next();
}

module.exports = { getOneMovie };
