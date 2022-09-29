const Sequelize = require('sequelize');


const db = new Sequelize('indereq', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3308,
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

module.exports = db