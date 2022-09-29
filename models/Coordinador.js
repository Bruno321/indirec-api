const Sequelize = require('sequelize')
const { db } = require('../config/')

const Coordinador = db.define('coordinador', {
    coordinadorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    expediente: {type: Sequelize.STRING(32),allowNull: false},
    email: {type: Sequelize.STRING(32),allowNull: false},
    nombreCompleto: {type: Sequelize.STRING(100),allowNull: false},
    password:{type: Sequelize.STRING(100), allowNull:false},
    fechaDadoDeAlta: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
    activo: {
        type:Sequelize.INTEGER(1),
        // 0: activo, 1: inactivo
        defaultValue: 0,
    },
})

module.exports = Coordinador;