const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 50
        },
        permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission'
        }]
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Role', RoleSchema);
