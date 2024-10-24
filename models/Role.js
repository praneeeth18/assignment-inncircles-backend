const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 50
        },
        permissions: [{
            type: String,
            enum: ['READ', 'WRITE', 'ADMIN'],
            required: true,
            default: 'READ'
          }]
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Role', RoleSchema);
