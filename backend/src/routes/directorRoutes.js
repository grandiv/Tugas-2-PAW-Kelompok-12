const directorRouter = require("express").Router();
const { getOneDirector } = require("../middlewares/directorMiddlewares");

const {
  addDirector,
  getAllDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
} = require("../controllers/directorControllers");

directorRouter.post("/create", addDirector);
directorRouter.get("/", getAllDirectors);
directorRouter.get("/:id", getOneDirector, getDirector);
directorRouter.patch("/:id", getOneDirector, updateDirector);
directorRouter.delete("/:id", getOneDirector, deleteDirector);

module.exports = directorRouter;
