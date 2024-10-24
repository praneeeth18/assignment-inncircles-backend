const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

router.post('/', issueController.createIssue);
router.get('/getAllIssues', issueController.getAllIssues);
router.put('/updateIssue/:id', issueController.updateIssue);
router.delete('/deleteIssue/:id', issueController.deleteIssue);

module.exports = router;