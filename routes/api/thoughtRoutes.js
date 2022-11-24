const router = require('express').Router();
const {
    getAllThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');
const {
    createReaction,
    deleteReaction
} = require('../../controllers/reactionController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
