const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');
const authorize = require('../middleware/authorize');

router.post('/', authorize(['WRITE']), registerController.createNewUser);
router.get('/', authorize(['READ']), userController.getAllUsers);
router.get('/:id', authorize(['READ']), userController.getUserById);
router.get('/roles/:id', authorize(['READ']), userController.getRoleByUserId);
router.put('/updateProfile/:id', authorize(['READ']), userController.updateUserProfile);
router.put('/:id', authorize(['WRITE']), userController.updateUser);
router.put('/updatePassword/:id', authorize(['WRITE']), userController.updatePassword)
router.delete('/:id', authorize(['DELETE']), userController.deleteUser);

module.exports = router;