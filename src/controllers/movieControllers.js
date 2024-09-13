const Movie = require("../models/movieModels");

const createMovie = async (req, res) => {
  const { title, description, genre, release_date, actors, image } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      genre,
      release_date,
      actors,
      image,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully" });
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
  const { score, comment } = req.body;
  const userId = req.user.id;

  try {
    const movie = res.movie;
    movie.rating.push({ user: userId, score, comment });
    await movie.save();
    res.status(201).json({ message: "Rating added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
