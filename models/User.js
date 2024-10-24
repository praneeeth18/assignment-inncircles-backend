const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
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
            minlength: 8,
            select: false,
            validate: {
                validator: function(v) {
                  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
                },
                message: props => `Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.`
            }
        },
        contact: {
            type: String,
            maxlength: 15
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);