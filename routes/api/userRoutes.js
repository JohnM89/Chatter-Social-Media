const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  userCount
} = require('../../controllers/userController');

// /api/user
router.route('/').get((req, res) => getAllUsers(req, res)).post((req, res) => createUser(req, res));

// /api/user/count
router.route('/count').get((req, res) => userCount(req, res));

// update a user
router.route('/:userId').put((req, res) => updateUser(req, res));

// /api/user/:userId
router.route('/:userId').get((req, res) => getSingleUser(req, res)).delete((req, res) => deleteUser(req, res));

// /api/users/:userId/friends
router.route('/:userId/friends').post((req, res) => addFriend(req, res));

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete((req, res) => removeFriend(req, res));

module.exports = router;
