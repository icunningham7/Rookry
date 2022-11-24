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

// /api/thoughts/:thouhtId
router.route('/:thouhtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thouhtId/reactions
router.route('/:thouhtId/reactions')
    .post(createReaction);

// /api/thoughts/:thouhtId/reactions/:reactionId
router.route('/:thouhtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
