const { User, Thought } = require('../models');

async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createThought(req, res) {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = await Thought.create({ thoughtText, username, userId });
    res.json(newThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function deleteThought(req, res) {
  try {
    const thoughtToDelete = await Thought.findById(req.params.thoughtId);
    if (!thoughtToDelete) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    const userIds = thoughtToDelete.users;
    await Thought.findByIdAndDelete(req.params.thoughtId);
    for (const userId of userIds) {
      await User.findByIdAndUpdate(userId, { $pull: { thoughts: req.params.thoughtId } });
    }
    res.json({ message: 'Thought and associated users successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function updateThought(req, res) {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function createReaction(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function removeReaction(req, res) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    thought.reactions = thought.reactions.filter(reaction => reaction.reactionId.toString() !== req.params.reactionId);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  removeReaction
};
