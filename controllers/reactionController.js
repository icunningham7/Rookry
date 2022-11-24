const { User, Thought, Reaction } = require('../models');


module.exports = {
    // Create one reaction and add to a thought
    createReaction(req, res) {
        Thought.reaction.create(req.body)
        // Reaction.create(req.body)
            .then((reaction) => {
                // Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                //     { $push: reaction.id },
                //     { runValidators: true, new: true }
                // );
                res.json(reaction);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Delete one reaction and update its thought
    deleteReaction(req, res) {
        Thought.reaction.id(req.params.reactionId).remove()
        // Reaction.findOneAndDelete({ _id: req.params.reactionId })
            .then((reaction) => {
                if (!reaction) {
                    res.status(404).json({ message: 'No reaction found' });
                } else {
                    // Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                    //     { $pull: req.body.reactionId },
                    //     { runValidators: true, new: true }
                    // );
                    res.json(user);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    }
}