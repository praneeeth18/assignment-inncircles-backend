const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized: No refresh token provided' });
        const refreshToken = cookies.jwt;
    
        const foundUser = await User.findOne({ refreshToken });
        if (!foundUser) return res.status(403).json({ message: 'Forbidden: Refresh token not recognized' });  
        
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.email !== decoded.UserInfo.email) {
                    res.status(403).json({ message: 'Forbidden: Token verification failed' });
                }
                
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": decoded.UserInfo.email,
                            "roles": decoded.UserInfo.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );
                res.status(200).json({ message: 'Verification successfull!', accessToken });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during token refresh', error: error.message });
    }
}

module.exports = { handleRefreshToken };