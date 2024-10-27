const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format.' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Unauthorized: Token has expired.' });
            } else {
                return res.status(403).json({ message: 'Forbidden: Token is invalid.' });
            }
        }

        req.user = {
            id: decoded.UserInfo.userId, 
            email: decoded.UserInfo.email,
            roles: decoded.UserInfo.roles
        };

        next();
    });
}

module.exports = verifyJWT;