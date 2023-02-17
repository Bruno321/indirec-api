const Sequelize = require('sequelize');
const {db} = require('../config/');
const Deportista = require('./Deportista');
const Equipo = require('./Equipo');

const Evento = db.define('evento', {
    eventoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreEvento: {
        type: Sequelize.STRING(32), allowNull: false
    },
    fechaEvento: {
        type: Sequelize.DATEONLY(64), allowNull: false
    },
    horaEvento: {
        type: Sequelize.STRING(32), allowNull: false
    },
    equipoLocal: {
        type: Sequelize.INTEGER, allowNull: false
    },
    directorTecnicoLocal: {
        type: Sequelize.STRING(60), allowNull: false
    },
    puntosLocal: {
        type: Sequelize.STRING(4), allowNull: true
    },
    canchaJugada: {
        type: Sequelize.STRING(40), allowNull: false
    },
    equipoVisitante: {
        type: Sequelize.INTEGER, allowNull: false
    },
    directorTecnicoVisitante: {
        type: Sequelize.STRING(60), allowNull: false
    },
    puntosVisitante: {
        type: Sequelize.STRING(4), allowNull: true
    },
    jornada: {
        type: Sequelize.STRING(2), allowNull: false
    },
    incidentes: {
        type: Sequelize.STRING(140), allowNull: true
    }
})

module.exports = Evento;