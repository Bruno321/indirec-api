const Sequelize = require('sequelize')
const { db } = require('../config/')

const Deportista = db.define('deportista', {
    deportistaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    expediente: {type: Sequelize.STRING(32),allowNull: false},
    nombreCompleto: {type: Sequelize.STRING(100),allowNull: false},
    correo:{type: Sequelize.STRING(80), allowNull:false},
    telefono: {type: Sequelize.STRING(32), allowNull:false},
    telefonoEmergencia: {type: Sequelize.STRING(32), allowNull:false},
    numSeguroSocial: {type: Sequelize.STRING(100), allowNull:false},
    genero: {
        // 0: hombre, 1: mujer
        type: Sequelize.INTEGER(1), 
        allowNull:false
    },
    fotoIdentificacionOficial: {type: Sequelize.STRING(64), allowNull:false},
    foto: {type: Sequelize.STRING(64), allowNull:false},
    fotoCardex: {type: Sequelize.STRING(64), allowNull:false},
    fechaDadoDeAlta: {type: Sequelize.DATEONLY(64), defaultValue: Sequelize.NOW},
    activo: {
        type:Sequelize.INTEGER(1),
        // 0: activo, 1: inactivo
        defaultValue: 0,
    },
})


module.exports = Deportista;