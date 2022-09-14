/**
 * Ruta para las acciones sobre un deportista
 * Path: api/deportistas/
 */
 const { Router } = require("express");
 const router = Router();
 const { deportistasController } = require("../controllers");
 const { authorization } = require("../middlewares");

/**
 * Solicita informacion sobre los deportistas
 */
 router.get("/",
	authorization,
	deportistasController.getDeportistas)

/**
 * Registra un deportista
 */
router.post("/",
	authorization,
	deportistasController.postDeportista)
 
/**
 * Solicita informacion sobre un deportista
 */
 router.get("/:expediente",
	authorization,
	deportistasController.getDeportista)

 module.exports = router;