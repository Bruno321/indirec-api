/**
 * Ruta para las acciones sobre un deportista
 * Path: api/coordinadores/
 */
 const { Router } = require("express");
 const router = Router();
 const { coordinadoresController } = require("../controllers");
 const { authorization } = require("../middlewares");

/**
 * Solicita informacion sobre los coordinadores
 */
//  router.get("/",
// 	authorization,
// 	coordinadoresController.getCoordinadores)
/**
 * Registra un coordinador
 */
router.post("/",
	coordinadoresController.postCoordinador)
 
 module.exports = router;