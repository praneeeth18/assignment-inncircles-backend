require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection.js');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const createAdminRoleAndUser = require('./seeds/systemAdmin.js');

// dbconnection
connectDB();

// app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
// app.use('/api/register', require('./routes/register.js'));
app.use('/api/login', require('./routes/auth.js'));
app.use('/api/logout', require('./routes/logout.js'));
app.use('/api/refresh', require('./routes/refresh.js'));

app.use(verifyJWT);
app.use('/api/users', require('./routes/user.js'));
app.use('/api/issues', require('./routes/issue.js'))
app.use('/api/roles', require('./routes/role.js'));

mongoose.connection.once('open',async () => {
    console.log('Connected to MongoDB');
    await createAdminRoleAndUser();
    app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}.`));
});