require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection.js');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

//dbconnection
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware
app.use(express.json());

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}.`));
});