const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bus_booking_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Toggle to true to see SQL logs in terminal
});

module.exports = sequelize;
