const Actor = require('../models/actorModels');

exports.createActor = async (req, res) => {
    const {name, desc, birth, images } = req.body;
    const actor = new Actor({
        name,
        desc,
        birth,
        images
    });
    try {
        await actor.save();
        res.status(201).json("Create Actor Success!");
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.deleteActor = async (req, res) => {
    try {
        const actor = await Actor.findByIdAndDelete(req.params.id);
        if(!actor) return res.status(404).json({
            message: "Actor not found"
        });
        res.status(200).json({
            message: "Actor deleted"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.getActorById = async(req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) return res.status(400).json({
            message: "Actor not found"
        });
        res.status(200).json(actor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
} 

exports.getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.updateActor = async (req, res) => {
    try {
        const updatedActor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!updatedActor) return res.status(404).json({
            message: "Actor not found"
        });
        res.status(200).json(updatedActor);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}