const movieRouter = require("express").Router();
const { getOneMovie } = require("../middlewares/movieMiddlewares");
const { authenticateToken } = require("../middlewares/authMiddleware");

const {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  movieAddRating,
} = require("../controllers/movieControllers");

movieRouter.post("/create", createMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getOneMovie, getMovie);
movieRouter.patch("/:id", getOneMovie, updateMovie);
movieRouter.delete("/:id", getOneMovie, deleteMovie);
movieRouter.post("/:id/rating", authenticateToken, getOneMovie, movieAddRating);

module.exports = movieRouter;
