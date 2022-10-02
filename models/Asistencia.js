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
    horaEntrada: {type: Sequelize.DATE,allowNull: true,default:null},
    horaSalida: {type: Sequelize.DATE,allowNull: true,default:null},
})

Asistencia.belongsTo(Deportista,{
    foreignKey: {
        name: 'deportistaId',
        allowNull: true
    }
})

module.exports = Asistencia;