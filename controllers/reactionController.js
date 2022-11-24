const { User, Thought, Reaction } = require('../models');


module.exports = {
    // Create one reaction and add to a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $push: {
                    reactions: req.body
                }
            },
            { runValidators: true, new: true }
        ).then((reaction) => res.json(reaction))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Delete one reaction and update its thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $pull: {
                    reactions: {
                        reactionId : req.params.reactionId
                    }
                }
            },
            { runValidators: true, new: true }
        ).then((thought) => !thought ? res.status(404).json({ message: 'Something went wrong!' }) : res.json(thought))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    }
}