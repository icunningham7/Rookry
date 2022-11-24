const { User, Thought, Reaction } = require('../models');


module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => !thoughts ? res.status(404).json({ message: 'No thoughts found' }) : res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get one thought
    getThought(req, res) {
        Thought.find({ _id: req.params.thoughtId })
            .then((thought) => !thought ? res.status(404).json({ message: 'No thought found' }) : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // Create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate({ username: req.body.username },
                    {
                        $push: {
                            thoughts: thought._id
                        }
                    },
                    { runValidators: true, new: true }
                ).then(res.json(thought));
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found' });
                }
                else {
                    if (req.body.username) {
                        User.findOneAndUpdate({ username: req.body.username },
                            {
                                $addToSet: {
                                    thoughts: thought._id
                                }
                            }).then(res.json(thought));
                    } else { res.json(thought) }
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found' });
                } else {
                    User.findOneAndUpdate({ username: thought.username },
                        {
                            $pull: {
                                thoughts: req.params.thoughtId
                            }
                        }).then( res.json(thought) );
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    }
}