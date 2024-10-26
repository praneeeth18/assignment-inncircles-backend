const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registerController = require('../controllers/registerController');

router.post('/', registerController.createNewUser);
router.get('/', userController.getAllUsers);
router.get('/roles/:id', userController.getRoleByUserId);
router.put('/updateProfile/:id', userController.updateUserProfile)
router.put('/updateRole/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;