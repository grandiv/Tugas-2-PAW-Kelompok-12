const directorRouter = require("express").Router();

const {
  createDirector,
  getAllDirectors,
  getDirectorById,
  updateDirector,
  deleteDirector,
} = require("../controllers/directorControllers");

directorRouter.post("/create", createDirector);
directorRouter.get("/", getAllDirectors);
directorRouter.get("/:id", getDirectorById);
directorRouter.patch("/:id", updateDirector);
directorRouter.delete("/:id", deleteDirector);

module.exports = directorRouter;
