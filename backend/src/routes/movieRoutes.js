const movieRouter = require("express").Router();
const { getOneMovie } = require("../middlewares/movieMiddlewares");

const {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieControllers");

movieRouter.post("/create", createMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getOneMovie, getMovie);
movieRouter.patch("/:id", getOneMovie, updateMovie);
movieRouter.delete("/:id", getOneMovie, deleteMovie);

module.exports = movieRouter;
