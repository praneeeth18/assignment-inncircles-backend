const credentials = require('../middleware/credentials');
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}

module.exports = corsOptions;