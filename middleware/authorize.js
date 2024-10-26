const User = require('../models/User');

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; 
      const user = await User.findById(userId).populate('roles');
      
      if (user.roles.some(role => role.name === 'SystemAdmin')) {
        return next();
      }

      const hasPermission = user.roles.some(role =>
        role.permissions.some(permission => requiredPermissions.includes(permission))
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access Denied' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = authorize;
