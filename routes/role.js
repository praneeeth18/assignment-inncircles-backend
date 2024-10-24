const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

router.post('/', roleController.createRole);
router.get('/getAllRoles', roleController.getAllRoles);
router.put('/updateRole/:id', roleController.updateRole);
router.delete('/deleteRole/:id', roleController.deleteRole);

module.exports = router;