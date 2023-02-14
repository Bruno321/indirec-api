const authController = require('./authController')
const coordinadoresController = require('./coordinadoresController')
const deportistasController = require('./deportistasController')
const uploadsController = require('./uploadsController')
const EquiposController = require('./EquiposController');
const eventosController = require("./eventosController");

module.exports = {
    authController,
    coordinadoresController,
    deportistasController,
    uploadsController,
    EquiposController,
    eventosController
}