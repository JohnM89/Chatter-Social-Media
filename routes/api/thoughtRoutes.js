const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get((req, res) => getThoughts(req, res)).post((req, res) => createThought(req, res));

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get((req, res) => getSingleThought(req, res))
  .put((req, res) => updateThought(req, res))
  .delete((req, res) => deleteThought(req, res));

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post((req, res) => createReaction(req, res));

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete((req, res) => removeReaction(req, res));

module.exports = router;
