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

// dbconnection
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/auth.js'));
app.use('/refresh', require('./routes/refresh.js'));

app.use(verifyJWT);
app.use('/users', require('./routes/user.js'));
app.use('/issues', require('./routes/issue.js'))
app.use('/roles', require('./routes/role.js'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}.`));
});