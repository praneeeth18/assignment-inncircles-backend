const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },
        age: {
            type: Number,
            min: 1,
            max: 100
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        contact: {
            type: String,
            maxlength: 15
        },
        roles: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }],
        bio: { 
            type: String,
            maxlength: 250,
            trim: true
        },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);