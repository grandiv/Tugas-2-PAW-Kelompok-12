const Movie = require("../models/movieModels");

const createMovie = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    release_date: req.body.release_date,
    actors: req.body.actors,
    image: req.body.image,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMovie = async (req, res) => {
  res.json(res.movie);
};

const updateMovie = async (req, res) => {
  if (req.body.title != null) {
    res.movie.title = req.body.title;
  }
  if (req.body.description != null) {
    res.movie.description = req.body.description;
  }
  if (req.body.genre != null) {
    res.movie.genre = req.body.genre;
  }
  if (req.body.release_date != null) {
    res.movie.release_date = req.body.release_date;
  }
  if (req.body.actors != null) {
    res.movie.actors = req.body.actors;
  }

  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "Deleted movie" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const movieAddRating = async (req, res) => {
  const { user, score, comment } = req.body;

  if (!user || !score) {
    return res.status(400).json({ message: "User and score are required" });
  }

  res.movie.rating.push({ user, score, comment });
  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  movieAddRating,
};
