const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 100
        },
        description: {
            type: String,
            maxlength: 250,
            trim: true
        }
    },
    { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);
