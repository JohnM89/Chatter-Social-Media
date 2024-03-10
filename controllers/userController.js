const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall
const userCount = async () => {
  const result = await User.aggregate([
    { $count: "userCount" }
  ]);
  return result[0] ? result[0].userCount : 0;
}

// Get all users
async function getAllUsers() {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Get a single user
async function getSingleUser(req, res) {
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
    res.status(500).json(err);
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update a user
async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Delete a user and remove their thoughts
async function deleteUser(req, res) {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.userId);

    if (!userToDelete) {
      return res.status(404).json({ message: 'No such user exists!' });
    }

    await Thought.deleteMany({ username: userToDelete.username });

    res.json({ message: 'User and their thoughts successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// Add a friend to a user
async function addFriend(req, res) {
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
    res.status(500).json(err);
  }
}

// Remove a friend from a user
async function removeFriend(req, res) {
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
    res.status(500).json(err);
  }
}

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend, userCount };
