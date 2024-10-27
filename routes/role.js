const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authorize = require('../middleware/authorize');

router.post('/', authorize(['WRITE']), roleController.createRole);
router.get('/', authorize(['READ']), roleController.getAllRoles);
router.put('/:id', authorize(['WRITE']), roleController.updateRole);
router.delete('/:id', authorize(['DELETE']), roleController.deleteRole);

module.exports = router;