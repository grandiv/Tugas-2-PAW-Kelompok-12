const Movie = require("../models/movieModels");
const Actor = require("../models/actorModels");
const Director = require("../models/directorModels");

const createMovie = async (req, res) => {
  const {
    title,
    description,
    genre,
    category,
    release_date,
    actors,
    images,
    awards,
    directors,
  } = req.body;

  const newMovie = new Movie({
    title,
    description,
    genre,
    category,
    release_date,
    actors,
    images,
    awards,
    directors,
  });

  try {
    const savedMovie = await newMovie.save();

    await Actor.updateMany(
      { _id: { $in: actors } }, // Find all actors whose IDs are in the 'actors' array
      { $push: { movies: savedMovie._id } } // Push the new movie's ID into their movies list
    );

    // Update each director's movies list with the new movie ID
    await Director.updateMany(
      { _id: { $in: directors } }, // Find all directors whose IDs are in the 'directors' array
      { $push: { movies: savedMovie._id } } // Push the new movie's ID into their movies list
    );

    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("actors", "name")
      .populate("directors", "name")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username",
        },
      });
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
  if (req.body.category != null) {
    res.movie.category = req.body.category;
  }
  if (req.body.release_date != null) {
    res.movie.release_date = req.body.release_date;
  }
  if (req.body.actors != null) {
    res.movie.actors = req.body.actors;
  }
  if (req.body.images != null) {
    res.movie.images = req.body.images;
  }
  if (req.body.awards != null) {
    res.movie.awards = req.body.awards;
  }
  if (req.body.directors != null) {
    res.movie.directors = req.body.directors;
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

module.exports = {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
