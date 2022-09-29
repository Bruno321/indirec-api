const Sequelize = require('sequelize')
const { db } = require('../config/')
const Deportista = require('./Deportista')

const Asistencia = db.define('asistencia', {
    asistenciaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
    horaEntrada: {type: Sequelize.DATE,allowNull: false},
    horaSalida: {type: Sequelize.DATE,allowNull: false},
})

Asistencia.belongsTo(Deportista,{
    foreignKey: {
        name: 'deportistaId',
        allowNull: true
    }
})

module.exports = Asistencia;