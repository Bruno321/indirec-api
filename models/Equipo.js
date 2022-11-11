const Sequelize = require("sequielize");
const {db} = require("../config/");

// nombre, facultad, campus, deporte, categoria, entrenador, asistente

const Equipo = db.define("equipo", {
equipoId:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
nombre:{
    type: Sequelize.STRING(80),
    allowNull: false,

},
facultad:{
    type: Sequelize.STRING(50), 
    allowNull:false,
},
campus:{
    type: Sequelize.STRING(40),
    allowNull: false,
},
deporte:{
    type: Sequelize.STRING(30),
    allowNull: false,
},
categoria:{
    type: Sequelize.STRING(20),
    allowNull: false
},
nombreEntrenador:{
    type: Sequelize.STRING(100),
    allowNull: false
},
apellidoEntrenador:{
    type: Sequelize.STRING(100),
    allowNull: false
},
nombreAsistente:{
    type: Sequelize.STRING(100),
    allowNull: false
},
apellidoAsistente:{
    type: Sequelize.STRING(100),
    allowNull: false
},
// Default: 0 - Está activo
// 1 - NO ESTÁ ACTIVO
isActive:{
    tyle: Sequelize.INTEGER(1),
}
})

module.exports = Equipo;