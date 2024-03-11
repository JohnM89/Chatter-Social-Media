const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () => {
  try {
    const result = await User.aggregate([{ $count: "userCount" }]);
    return result[0] ? result[0].userCount : 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get a single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a user and remove their thoughts
const deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'No such user exists!' });
    }
    await Thought.deleteMany({ username: userToDelete.username });
    res.json({ message: 'User and their thoughts successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Add a friend to a user
const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.body.friendId } },
      { new: true }
      
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Remove a friend from a user
const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend, userCount };
