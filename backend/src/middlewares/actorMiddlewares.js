const Actor = require("../models/actorModels");

async function getOneActor(req, res, next) {
  let actor;
  try {
    actor = await Actor.findById(req.params.id);
    if (actor == null) {
      return res.status(404).json({ message: "Cannot find actor" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.actor = actor;
  next();
}

module.exports = { getOneActor };
