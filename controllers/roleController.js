const Role = require('../models/Role');

const createRole = async (req, res) => {
    try {
        const { name , permissions } = req.body;
        if(!name || !permissions || permissions.length === 0) {
            return res.status(400).json({ message: 'All fields (name, permissions) are required.'});
        }
        
        const existingRole = await Role.findOne({ 'name': name });
        if(existingRole) {
            return res.status(409).json({ message: `Role ${name} already exists.`});
        }

        const newRole = new Role(
            {
                name: name,
                permissions: permissions
            }
        );

        await newRole.save();
        res.status(201).json({ message: `New role ${name} created successfully.`})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Something went wrong! ${error.message}`});
    }

};

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: `Something went wrong. ${error.message}` });
    }
}

const updateRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        if(!name || !permissions || permissions.length === 0) {
            return res.status(400).json({ message: 'All fields (name, permissions) are required.'});
        }

        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found.'});
        }

        role.name = name;
        role.permissions = permissions

        await role.save();
        res.status(200).json({ message: 'Role updated successfully'});
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}` });
    }
};

const deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong! ${error.message}`});
    }
};


module.exports = {
    createRole,
    getAllRoles,
    updateRole,
    deleteRole
}