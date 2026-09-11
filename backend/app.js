const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Resolves CORS cross-origin configuration blockages
app.use(bodyParser.json()); // explicitly parsing JSON bodies

// Routes
app.use('/api', bookingRoutes);

// Database Sync and Server Startup
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });
