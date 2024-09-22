const actorRouter = require("express").Router();
const { getOneActor } = require("../middlewares/actorMiddlewares");

const {
  addActor,
  getAllActors,
  getActor,
  updateActor,
  deleteActor,
} = require("../controllers/actorControllers");

actorRouter.post("/create", addActor);
actorRouter.get("/", getAllActors);
actorRouter.get("/:id", getOneActor, getActor);
actorRouter.patch("/:id", getOneActor, updateActor);
actorRouter.delete("/:id", getOneActor, deleteActor);

module.exports = actorRouter;
