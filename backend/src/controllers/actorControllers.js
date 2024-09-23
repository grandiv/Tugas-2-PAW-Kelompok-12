const Actor = require("../models/actorModels");
const Movie = require("../models/movieModels");

exports.createActor = async (req, res) => {
  const { name, desc, birth, images } = req.body;
  const actor = new Actor({
    name,
    desc,
    birth,
    images,
  });
  try {
    await actor.save();
    res.status(201).json("Create Actor Success!");
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.addActorMovies = async (req, res) => {
  try {
    const { movieId } = req.body;
    const actorId = req.params.id;

    const movie = await Movie.findById(movieId);
    if (!movie)
      return res.status(404).json({
        message: "Movie not found",
      });

    const actor = await Actor.findById(actorId);
    if (!actor)
      return res.status(404).json({
        message: "Actor not found",
      });

    if (actor.movies.includes(movieId)) {
      return res.status(400).json({
        message: "Movie has already been added",
      });
    }

    actor.movies.push(movieId);
    await actor.save();
    res.status(200).json({
      message: "Movie succesfully add to actor",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.removeActorMovies = async (req, res) => {
  try {
    const { movieId } = req.body;
    const actorId = req.params.id;

    const movie = await Movie.findById(movieId);
    if (!movie)
      return res.status(404).json({
        message: "Movie not found",
      });

    const actor = await Actor.findById(actorId);
    if (!actor)
      return res.status(404).json({
        message: "Actor not found",
      });

    const movieIndex = actor.movies.indexOf(movieId);
    if (movieIndex === -1) {
      return res.status(404).json({
        message: "Movie not found in actor's movies",
      });
    }

    actor.movies.splice(movieIndex, 1);
    await actor.save();
    res.status(200).json({
      message: "Movie succesfully add to actor",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.addActorImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const actorId = req.params.id;

    const actor = await Actor.findById(actorId);
    if (!actor)
      return res.status(404).json({
        message: "Actor not found",
      });

    if (actor.images.includes(imageUrl)) {
      return res.status(400).json({
        message: "Image has already been added",
      });
    }

    actor.movies.push(imageUrl);
    await actor.save();
    res.status(200).json({
      message: "Image succesfully add to actor",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.removeActorImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const actorId = req.params.id;

    const actor = await Actor.findById(actorId);
    if (!actor)
      return res.status(404).json({
        message: "Actor not found",
      });

    const imageIndex = actor.movies.indexOf(imageUrl);
    if (imageIndex === -1) {
      return res.status(404).json({
        message: "Image not found in actor's movies",
      });
    }

    actor.movies.splice(imageIndex, 1);
    await actor.save();
    res.status(200).json({
      message: "Image succesfully add to actor",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor)
      return res.status(404).json({
        message: "Actor not found",
      });
    res.status(200).json({
      message: "Actor deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor)
      return res.status(400).json({
        message: "Actor not found",
      });
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const updatedActor = await Actor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedActor)
      return res.status(404).json({
        message: "Actor not found",
      });
    res.status(200).json(updatedActor);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
