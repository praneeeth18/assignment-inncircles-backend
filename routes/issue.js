const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const authorize = require('../middleware/authorize');

router.post('/', authorize(['WRITE']), issueController.createIssue);
router.get('/', authorize(['READ']), issueController.getAllIssues);
router.put('/:id', authorize(['WRITE']), issueController.updateIssue);
router.delete('/:id', authorize(['DELETE']), issueController.deleteIssue);

module.exports = router;