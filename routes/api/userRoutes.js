const router = require('express').Router();
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    createUserFriend,
    deleteUserFriend,
    deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .put(createUserFriend)
  .delete(deleteUserFriend);

module.exports = router;
