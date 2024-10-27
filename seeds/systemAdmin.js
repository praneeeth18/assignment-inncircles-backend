const mongoose = require('mongoose');
const Role = require('../models/Role'); 
const User = require('../models/User'); 
const bcrypt = require('bcrypt');

const createRolesAndAdminUser = async () => {
    try {
        let role = await Role.findOne({ name: 'Admin' });
        if (!role) {
            const systemAdminRole = new Role({
                name: 'Admin',
                permissions: ['READ', 'WRITE', 'DELETE'], 
            });
            role = await systemAdminRole.save();
            console.log('SystemAdmin role created');
        } else {
            console.log('SystemAdmin role already exists');
        }

        const adminUser = await User.findOne({ email: 'sysAdmin007@gmail.com' });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('Admin@007', 10);
            const newUser = new User({
                name: 'SystemAdmin',
                email: 'sysAdmin007@gmail.com',
                password: hashedPassword,
                roles: [role._id],
            });
            await newUser.save();
            console.log('SystemAdmin user created');
        } else {
            console.log('SystemAdmin user already exists');
        }
    } catch (err) {
        console.error('Error creating roles or user:', err);
    }
};

module.exports = createRolesAndAdminUser;
