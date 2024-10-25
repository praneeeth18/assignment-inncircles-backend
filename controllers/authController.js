const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password ) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
    
        const foundUser = await User.findOne({ 'email': email }).populate('roles');
        if (!foundUser) {
            return res.status(400).json({ message: 'User not found'});
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        'email': foundUser.email,
                        'roles': foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            const refreshToken = jwt.sign(
                {
                    "UserInfo": {
                        'email': foundUser.email,
                        'roles': foundUser.roles
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d'}
            );

            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            return res.status(200).json({ message: 'Login successful', accessToken });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
}

module.exports = { handleLogin };