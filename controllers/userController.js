const { User, Thought, Reaction } = require('../models');


module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            .then((users) => !users ? res.status(404).json({ message: 'No users found' }) : res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get one user
    getUser(req, res) {
        User.find({ _id: req.params.userId }).populate('thoughts').populate('friends')
            .then((user) => !user ? res.status(404).json({ message: 'No user found' }) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Create one user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Update one user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user found' }) : res.json(user))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Add a friend to user's friendlist
    createUserFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            {
                $addToSet: {
                    friends: req.params.friendId
                }
            },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user found' }) : res.json(user))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Remove a friend to user's friendlist
    deleteUserFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            {
                $pull: {
                    friends: req.params.friendId
                }
            },
            { runValidators: true, new: true }
        )
            .then((user) => !user ? res.status(404).json({ message: 'No user found' }) : res.json(user))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    },
    // Delete one user and their thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found' });
                } else {
                    Thought.deleteMany({ username: user.username })
                    .then( res.json(user) );
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json(err)
            });
    }
}