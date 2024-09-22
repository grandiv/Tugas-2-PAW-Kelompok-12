const express = require("express");
const {
  updateActor,
  getActorById,
  getAllActors,
  deleteActor,
  createActor,
  addActorMovies,
  removeActorMovies,
  addActorImage,
  removeActorImage,
} = require("../controllers/actorControllers");
const actorRouter = express.Router();

actorRouter.get("/", getAllActors);
actorRouter.post("/", createActor);
actorRouter.get("/:id", getActorById);
actorRouter.post("/:id/movie", addActorMovies);
actorRouter.delete("/:id/movie", removeActorMovies);
actorRouter.post("/:id/image", addActorImage);
actorRouter.delete("/:id/image", removeActorImage);
actorRouter.put("/:id", updateActor);
actorRouter.delete("/:id", deleteActor);

module.exports = actorRouter;
