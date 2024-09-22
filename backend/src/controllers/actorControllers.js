const Actor = require("../models/actorModels");

const addActor = async (req, res) => {
  const { name, desc, birth, images } = req.body;

  try {
    const newActor = new Actor({
      name,
      desc,
      birth,
      images,
    });

    await newActor.save();
    res.status(201).json({ message: "Actor added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getActor = async (req, res) => {
  res.json(res.actor);
};

const updateActor = async (req, res) => {
  if (req.body.name != null) {
    res.actor.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.actor.desc = req.body.desc;
  }
  if (req.body.birth != null) {
    res.actor.birth = {
      date: req.body.birth.date || res.actor.birth.date,
      country: req.body.birth.country || res.actor.birth.country,
    };
  }
  if (req.body.images != null) {
    res.actor.images = req.body.images;
  }

  try {
    const updatedActor = await res.actor.save();
    res.json(updatedActor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteActor = async (req, res) => {
  try {
    await Actor.deleteOne({ _id: res.actor._id });
    res.json({ message: "Actor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addActor, getAllActors, getActor, updateActor, deleteActor };
