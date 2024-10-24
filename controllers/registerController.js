const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');

const isPasswordValid = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = passwordCriteria.test(password);
    return isValid;
};

const createNewUser = async (req, res) => {
    try {
        const { name, email, password, roles, contact, bio } = req.body;
        if (!name || !email || !password || !roles) {
            return res.status(400).json({ message: 'All fields (name, email, password, role) are required.' });
        }
    
        const roleExists = await Role.findById(roles);
        if (!roleExists) {
            return res.status(400).json({ message: 'Invalid role provided.' });
        }
        
        const existingUser = await User.findOne({ 'email': email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists.' });
        }

        if (!isPasswordValid(password)) {
            return res.status(400).json({ message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User(
            {
                name,
                email,
                password: hashedPassword,
                contact,
                roles,
                bio
            }
        );

        await newUser.save();

        res.status(201).json({ message: `New user ${email} created successfully!` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Something went wrong! ${error.message}`})
    }
};

module.exports = { createNewUser };