const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 100
        },
        description: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 500
        },
        status: {
            type: String,
            enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
            default: 'OPEN',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Issue', IssueSchema);
