const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().populate('roles');
        const usersWithRoles = allUsers.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            roles: user.roles.map(role => ({
                _id: role._id,
                name: role.name,
                permissions: role.permissions
            }))
        }));
        res.status(200).json(usersWithRoles);
    } catch (error) {
        return res.status(500).json({ message: `Something went wrong! ${error.message}`});
    }
}

const getRoleByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        
        const roles = user.roles;
        res.status(200).json({ roles });
    } catch (error) {
        return res.status(500).json({ message: `Something went wrong! ${error.message}`});
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.status(200).json({ message: 'User deleted successfully.'});
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}`});
    }
}

const updateUserProfile = async (req, res) => {
    const { name, bio, contact, age } = req.body;

    if (!name || !bio || !contact ) {
        return res.status(400).json({ message: 'Name, bio, and contact details are required.'});
    }
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.name = name;
        user.bio = bio;
        user.contact = contact;
        user.age = age;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully!'});
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}`});
    }
};

const updateUser = async (req, res) => {
    const { roles } = req.body;

    if(!roles || roles.length === 0) {
        return res.status(400).json({ message: 'Enter required details.'});
    }
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.roles = roles;

        await user.save();
        res.status(200).json({ message: 'User role udpated successfully.'})
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ,${error.message}` });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
}

const updatePassword = async (req, res) => {
    const { password } = req.body; 

    if (!password) {
        return res.status(400).json({ message: 'Password is required.' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword; 
        await user.save();

        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
};

module.exports = {
    getAllUsers,
    getRoleByUserId,
    getUserById,
    deleteUser,
    updateUserProfile,
    updateUser,
    updatePassword
};