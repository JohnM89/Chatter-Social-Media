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

// /api/students
router.route('/').get(getAllUsers).post(createUser);

// /api/students/count
router.route('/count').get(userCount);

// update a user
router.route('/:userId').put(updateUser);

// /api/students/:studentId
router.route('/user/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/friends').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
