const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().populate('roles');
        res.status(200).json(allUsers);
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
    const { name, bio, contact } = req.body;

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
}

module.exports = {
    getAllUsers,
    deleteUser,
    updateUserProfile,
    updateUser
};