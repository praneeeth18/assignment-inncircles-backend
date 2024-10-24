const Issue = require('../models/Issues');

const createIssue = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        const newIssue = new Issue({
            title,
            description,
            status
        });

        await newIssue.save();
        res.status(201).json({ message: 'Issue created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
};

const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
};

const updateIssue = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Title, description, and status are required.' });
    }

    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: 'Issue not found.' });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();
        res.status(200).json({ message: 'Issue updated successfully'});
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
}

const deleteIssue = async (req, res) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

        if (!deletedIssue) {
            return res.status(404).json({ message: 'Issue not found.' });
        }

        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
};

module.exports = {
    createIssue,
    getAllIssues,
    updateIssue,
    deleteIssue
};