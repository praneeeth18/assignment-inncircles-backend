require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection.js');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT.js');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;
const createAdminRoleAndUser = require('./seeds/systemAdmin.js');

// dbconnection
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use('/api/login', require('./routes/auth.js'));
app.use('/api/logout', require('./routes/logout.js'));
app.use('/api/refresh', require('./routes/refresh.js'));

app.use(verifyJWT);
app.use('/api/users', require('./routes/user.js'));
app.use('/api/issues', require('./routes/issue.js'))
app.use('/api/roles', require('./routes/role.js'));

app.use(errorHandler);

mongoose.connection.once('open',async () => {
    console.log('Connected to MongoDB');
    await createAdminRoleAndUser();
    app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}.`));
});