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
    
        const foundUser = await User.findOne({ 'email': email });
        if (!foundUser) {
            return res.status(400).json({ message: 'User not found'});
        }

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const roles = "value";
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        'email': foundUser.email,
                        'roles': roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d'}
            );
            res.cookie('jwt', )
        }
        
    } catch (error) {
        
    }


}