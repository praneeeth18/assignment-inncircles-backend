const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.put('/updateUserProfile/:id', userController.updateUserProfile)
router.put('/updateUserRole/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;