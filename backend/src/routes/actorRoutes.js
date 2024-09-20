const express = require('express');
const { updateActor, getActorById, getAllActors, deleteActor, createActor } = require('../controllers/actorControllers');
const actorRouter = express.Router();

actorRouter.get('/', getAllActors);
actorRouter.get('/:id', getActorById);
actorRouter.post('/', createActor);
actorRouter.put('/:id', updateActor);
actorRouter.delete('/:id', deleteActor);

module.exports = actorRouter;


